import path from 'node:path';
import { Node, SyntaxKind, type Expression, type SourceFile } from 'ts-morph';
import {
  automatedMatrixCoverage,
  consumerApiMatrixCoverage,
  manualMatrixLimitations,
  visualVocabularyContracts,
  type VocabularySource,
} from '../constants/consistency.const.ts';
import type {
  ComponentInfo,
  ConsistencyFinding,
  ConsistencyFindingCategory,
  ConsistencyFindingSeverity,
} from '../types/index.ts';
import { normalize } from './source-graph.ts';

type ConsistencyContext = {
  root: string;
  components: ComponentInfo[];
  sourceFiles: SourceFile[];
  publicExports: Map<string, Set<string>>;
};

type FindingInput = Omit<ConsistencyFinding, 'file' | 'line'> & {
  sourceFile: SourceFile;
  position?: number;
};

const controlledTriplets = [
  ['open', 'defaultOpen', 'onOpenChange'],
  ['value', 'defaultValue', 'onValueChange'],
  ['checked', 'defaultChecked', 'onCheckedChange'],
  ['pressed', 'defaultPressed', 'onPressedChange'],
  ['month', 'defaultMonth', 'onMonthChange'],
] as const;

const canonicalPropAliases = new Map<string, string>([
  ['leadingIcon', 'startIcon'],
  ['leftIcon', 'startIcon'],
  ['prefixIcon', 'startIcon'],
  ['trailingIcon', 'endIcon'],
  ['rightIcon', 'endIcon'],
  ['suffixIcon', 'endIcon'],
  ['helpText', 'helperText'],
  ['hintText', 'helperText'],
  ['errorMessage', 'error'],
  ['isDisabled', 'disabled'],
  ['isOpen', 'open'],
  ['initialOpen', 'defaultOpen'],
  ['isChecked', 'checked'],
  ['initialChecked', 'defaultChecked'],
  ['isPressed', 'pressed'],
  ['initialPressed', 'defaultPressed'],
  ['initialValue', 'defaultValue'],
  ['onValueChanged', 'onValueChange'],
  ['onCheckedChanged', 'onCheckedChange'],
  ['onPressedChanged', 'onPressedChange'],
  ['onOpenChanged', 'onOpenChange'],
]);

function repositoryPath(root: string, filePath: string): string {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function lineAt(sourceFile: SourceFile, position = 0): number {
  return sourceFile.getLineAndColumnAtPos(Math.max(0, position)).line;
}

function propertyPattern(name: string, optional?: boolean): RegExp {
  const suffix = optional === undefined ? '\\??' : optional ? '\\?' : '';
  return new RegExp(
    `(?:^|\\n)\\s*(?:['"]${name}['"]|${name})${suffix}\\s*:`,
    'm',
  );
}

function hasProperty(text: string, name: string): boolean {
  return propertyPattern(name).test(text);
}

function hasRequiredProperty(text: string, name: string): boolean {
  return propertyPattern(name, false).test(text);
}

function isPublicTypeFile(sourceFile: SourceFile): boolean {
  return /\.(?:props|types)\.ts$/.test(sourceFile.getBaseName());
}

function componentForFile(
  components: ComponentInfo[],
  filePath: string,
): ComponentInfo | undefined {
  const expectedName = path
    .basename(filePath)
    .replace(/\.(?:props|types)\.ts$/, '')
    .replace(/\.tsx?$/, '');
  const nameMatch = components.find(
    (component) => component.name === expectedName,
  );
  if (nameMatch) return nameMatch;

  const publicComponents = components.filter(
    (component) => component.scope === 'public',
  );
  const exactMatch = publicComponents.find(
    (component) => normalize(component.sourcePath) === normalize(filePath),
  );
  if (exactMatch) return exactMatch;

  return publicComponents
    .filter((component) =>
      normalize(filePath).startsWith(
        `${normalize(path.dirname(component.sourcePath))}${path.sep}`,
      ),
    )
    .sort(
      (left, right) =>
        path.dirname(right.sourcePath).length -
        path.dirname(left.sourcePath).length,
    )[0];
}

function finding(root: string, input: FindingInput): ConsistencyFinding {
  const { sourceFile, position, ...rest } = input;
  return {
    ...rest,
    file: repositoryPath(root, sourceFile.getFilePath()),
    line: lineAt(sourceFile, position),
  };
}

function addFinding(
  findings: ConsistencyFinding[],
  root: string,
  input: FindingInput,
): void {
  findings.push(finding(root, input));
}

function detectVanillaExtractTypeDependencies(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles.filter(isPublicTypeFile)) {
    for (const declaration of sourceFile.getImportDeclarations()) {
      const moduleName = declaration.getModuleSpecifierValue();
      const recipeTypes = declaration
        .getNamedImports()
        .map((namedImport) => namedImport.getName())
        .filter((name) =>
          /RecipeVariants|Sprinkles|ConditionalValue/.test(name),
        );
      const importsStyleModule = /\.css\.ts$/.test(moduleName);
      if (!importsStyleModule && recipeTypes.length === 0) continue;

      const component = componentForFile(
        context.components,
        sourceFile.getFilePath(),
      );
      const imported =
        recipeTypes.length > 0
          ? recipeTypes.join(', ')
          : (declaration.getImportClause()?.getText() ?? moduleName);
      addFinding(findings, context.root, {
        rule: 'public-vanilla-extract-type',
        severity: 'error',
        category: 'encapsulation',
        component: component?.name,
        symbol: imported,
        sourceFile,
        position: declaration.getStart(),
        message: `Le type public dépend de l'implémentation Vanilla Extract (${imported}).`,
        evidence: `Import public depuis \`${moduleName}\`.`,
        remediation:
          'Définir les unions publiques dans types/constants et faire consommer ce vocabulaire par la recette.',
      });
    }
  }
}

function detectBroadIndexSignatures(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  const broadIndex = /\[\s*\w+\s*:\s*string\s*]\s*:\s*(unknown|any)\b/g;
  for (const sourceFile of publicFiles.filter(isPublicTypeFile)) {
    const text = sourceFile.getFullText();
    for (const match of text.matchAll(broadIndex)) {
      const component = componentForFile(
        context.components,
        sourceFile.getFilePath(),
      );
      addFinding(findings, context.root, {
        rule: 'public-broad-index-signature',
        severity: 'error',
        category: 'type-safety',
        component: component?.name,
        sourceFile,
        position: match.index,
        message:
          'Une signature [key: string] publique désactive le contrôle des propriétés excédentaires.',
        evidence: match[0],
        remediation:
          'Étendre les attributs HTML du véritable élément ou utiliser une signature data-* ciblée.',
      });
    }
  }
}

function detectPublicAny(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles) {
    for (const anyNode of sourceFile.getDescendantsOfKind(
      SyntaxKind.AnyKeyword,
    )) {
      const typeReference = anyNode.getFirstAncestorByKind(
        SyntaxKind.TypeReference,
      );
      const typeName = typeReference?.getTypeName().getText();
      const isBaseUiRootProps =
        !isPublicTypeFile(sourceFile) &&
        typeName !== undefined &&
        /^Base[A-Z]\w*\.Root\.Props$/.test(typeName) &&
        (typeReference?.getTypeArguments().some(
          (typeArgument) => typeArgument.getKind() === SyntaxKind.AnyKeyword,
        ) ??
          false);

      // Base UI uses `any` in the generic root overloads. Keep that upstream
      // adapter type instead of weakening the wrapper to reproduce the
      // primitive's overloads locally.
      if (isBaseUiRootProps) continue;

      const component = componentForFile(
        context.components,
        sourceFile.getFilePath(),
      );
      addFinding(findings, context.root, {
        rule: 'public-any',
        severity: 'error',
        category: 'type-safety',
        component: component?.name,
        sourceFile,
        position: anyNode.getStart(),
        message: 'La surface publique contient un type any.',
        evidence: anyNode.getParent()?.getText() ?? 'any',
        remediation:
          'Conserver le générique de la primitive ou déclarer un type public précis.',
      });
    }
  }
}

function detectNonCanonicalPublicProps(
  context: ConsistencyContext,
  findings: ConsistencyFinding[],
): void {
  for (const component of context.components.filter(
    (candidate) => candidate.scope === 'public',
  )) {
    for (const prop of component.props) {
      const canonicalName = canonicalPropAliases.get(prop.name);
      if (!canonicalName) continue;
      const sourceFile = context.sourceFiles.find(
        (candidate) =>
          candidate.getBaseName().toLowerCase() ===
            `${component.name.toLowerCase()}.props.ts` &&
          normalize(candidate.getFilePath()).startsWith(
            `${normalize(path.dirname(component.sourcePath))}${path.sep}`,
          ),
      );
      if (!sourceFile) continue;
      addFinding(findings, context.root, {
        rule: 'noncanonical-common-prop',
        severity: 'error',
        category: 'type-safety',
        component: component.name,
        symbol: prop.name,
        sourceFile,
        position: sourceFile.getFullText().search(propertyPattern(prop.name)),
        message: `La prop ${prop.name} ne suit pas le vocabulaire commun de la matrice.`,
        evidence: `Nom observé : ${prop.name}. Nom canonique : ${canonicalName}.`,
        remediation: `Renommer ${prop.name} en ${canonicalName}.`,
      });
    }
  }
}

function detectFabricatedEvents(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  const fabricatedEvent = /\{\s*reason\s*:\s*['"]none['"]\s*}\s+as\s+never/g;
  for (const sourceFile of publicFiles.filter((file) =>
    file.getFilePath().endsWith('.tsx'),
  )) {
    const text = sourceFile.getFullText();
    for (const match of text.matchAll(fabricatedEvent)) {
      const component = componentForFile(
        context.components,
        sourceFile.getFilePath(),
      );
      addFinding(findings, context.root, {
        rule: 'fabricated-event-details',
        severity: 'error',
        category: 'callbacks',
        component: component?.name,
        sourceFile,
        position: match.index,
        message:
          "Le callback public reçoit des détails d'événement fabriqués au lieu de ceux de la primitive.",
        evidence: match[0],
        remediation:
          'Accepter et transmettre tous les arguments réels du callback source.',
      });
    }
  }
}

function detectIncompleteControlledTriplets(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles.filter((file) =>
    file.getBaseName().endsWith('.props.ts'),
  )) {
    const text = sourceFile.getFullText();
    for (const [controlled, defaultProp, callback] of controlledTriplets) {
      if (
        !hasProperty(text, controlled) ||
        !hasProperty(text, callback) ||
        hasProperty(text, defaultProp)
      ) {
        continue;
      }
      const component = componentForFile(
        context.components,
        sourceFile.getFilePath(),
      );
      addFinding(findings, context.root, {
        rule: 'incomplete-controlled-triplet',
        severity: 'error',
        category: 'controlled-state',
        component: component?.name,
        symbol: controlled,
        sourceFile,
        position: text.search(propertyPattern(controlled)),
        message: `L'état ${controlled} est contrôlable mais ne propose pas ${defaultProp}.`,
        evidence: `${controlled} + ${callback} sans ${defaultProp}`,
        remediation: `Ajouter ${defaultProp} et l'utiliser uniquement pour initialiser le mode uncontrolled.`,
      });
    }
  }
}

function detectControlledStateInitializers(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles.filter((file) =>
    file.getFilePath().endsWith('.tsx'),
  )) {
    const text = sourceFile.getFullText();
    for (const [controlled, defaultProp] of controlledTriplets) {
      const initializerPattern = new RegExp(
        `useState(?:<[^>]+>)?\\s*\\([^)]*\\b${defaultProp}\\b[^)]*\\b${controlled}\\b[^)]*\\)`,
        'g',
      );
      for (const match of text.matchAll(initializerPattern)) {
        const component = componentForFile(
          context.components,
          sourceFile.getFilePath(),
        );
        addFinding(findings, context.root, {
          rule: 'controlled-prop-used-as-default',
          severity: 'error',
          category: 'controlled-state',
          component: component?.name,
          symbol: controlled,
          sourceFile,
          position: match.index,
          message: `La prop contrôlée ${controlled} participe à l'initialisation de l'état interne.`,
          evidence: match[0],
          remediation: `Initialiser l'état uniquement depuis ${defaultProp}.`,
        });
      }
    }
  }
}

function stringLiteralValues(sourceFile: SourceFile, symbol: string): string[] {
  const typeAlias = sourceFile.getTypeAlias(symbol);
  if (typeAlias) {
    return typeAlias
      .getType()
      .getUnionTypes()
      .flatMap((type) => {
        if (!type.isStringLiteral()) return [];
        const value = type.getLiteralValue();
        return typeof value === 'string' ? [value] : [];
      });
  }

  const variable = sourceFile.getVariableDeclaration(symbol);
  let initializer = variable?.getInitializer();
  while (
    initializer &&
    (Node.isAsExpression(initializer) ||
      Node.isParenthesizedExpression(initializer))
  ) {
    initializer = initializer.getExpression();
  }
  if (!initializer || !Node.isObjectLiteralExpression(initializer)) return [];
  return initializer.getProperties().flatMap((property) => {
    if (!Node.isPropertyAssignment(property)) return [];
    return [property.getName().replace(/^['"]|['"]$/g, '')];
  });
}

function recipeValues(sourceFile: SourceFile, axis: string): string[] {
  const values: string[] = [];
  for (const variantsProperty of sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertyAssignment,
  )) {
    if (variantsProperty.getName() !== 'variants') continue;
    const variants = variantsProperty.getInitializerIfKind(
      SyntaxKind.ObjectLiteralExpression,
    );
    const axisProperty = variants
      ?.getProperties()
      .find(
        (property) =>
          Node.isPropertyAssignment(property) && property.getName() === axis,
      );
    if (!axisProperty || !Node.isPropertyAssignment(axisProperty)) continue;
    const axisObject = axisProperty.getInitializerIfKind(
      SyntaxKind.ObjectLiteralExpression,
    );
    if (!axisObject) continue;
    values.push(
      ...axisObject
        .getProperties()
        .flatMap((property) =>
          Node.isPropertyAssignment(property)
            ? [property.getName().replace(/^['"]|['"]$/g, '')]
            : [],
        ),
    );
  }
  return [...new Set(values)];
}

function contractValues(
  sourceFile: SourceFile,
  source: VocabularySource,
): string[] {
  if (source.kind === 'recipe') return recipeValues(sourceFile, source.axis);
  return stringLiteralValues(sourceFile, source.symbol);
}

function resolveDefaultExpression(expression: Expression): string | undefined {
  if (
    Node.isStringLiteral(expression) ||
    Node.isNoSubstitutionTemplateLiteral(expression)
  ) {
    return expression.getLiteralValue();
  }
  if (Node.isPropertyAccessExpression(expression)) return expression.getName();
  if (
    Node.isAsExpression(expression) ||
    Node.isParenthesizedExpression(expression)
  ) {
    return resolveDefaultExpression(expression.getExpression());
  }
  if (Node.isBinaryExpression(expression)) {
    return resolveDefaultExpression(expression.getRight());
  }
  const literalValue = expression.getType().getLiteralValue();
  return typeof literalValue === 'string' ? literalValue : undefined;
}

function defaultValue(
  sourceFile: SourceFile,
  axis: string,
): string | undefined {
  for (const property of sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertyAssignment,
  )) {
    if (property.getName() !== axis) continue;
    const defaultVariants = property
      .getAncestors()
      .find(
        (ancestor) =>
          Node.isPropertyAssignment(ancestor) &&
          ancestor.getName() === 'defaultVariants',
      );
    if (!defaultVariants) continue;
    const initializer = property.getInitializer();
    if (initializer) return resolveDefaultExpression(initializer);
  }

  for (const binding of sourceFile.getDescendantsOfKind(
    SyntaxKind.BindingElement,
  )) {
    const publicName =
      binding.getPropertyNameNode()?.getText() ??
      binding.getNameNode().getText();
    if (publicName !== axis) continue;
    const initializer = binding.getInitializer();
    if (initializer) return resolveDefaultExpression(initializer);
  }

  for (const declaration of sourceFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration,
  )) {
    if (declaration.getName() !== axis) continue;
    const initializer = declaration.getInitializer();
    if (initializer) return resolveDefaultExpression(initializer);
  }
  return undefined;
}

function sameValues(actual: string[], expected: readonly string[]): boolean {
  const sortedActual = [...actual].sort();
  const sortedExpected = [...expected].sort();
  return (
    sortedActual.length === sortedExpected.length &&
    sortedActual.every((value, index) => value === sortedExpected[index])
  );
}

function contractSourceFile(
  context: ConsistencyContext,
  relativePath: string,
): SourceFile | undefined {
  const expected = normalize(path.join(context.root, relativePath));
  return context.sourceFiles.find(
    (sourceFile) => normalize(sourceFile.getFilePath()) === expected,
  );
}

function componentPropsFiles(
  context: ConsistencyContext,
  componentName: string,
): SourceFile[] {
  const component = context.components.find(
    (candidate) => candidate.name === componentName,
  );
  if (!component) return [];
  const directory = path.dirname(component.sourcePath);
  return context.sourceFiles.filter(
    (sourceFile) =>
      path.dirname(sourceFile.getFilePath()) !== directory &&
      normalize(sourceFile.getFilePath()).startsWith(
        `${normalize(directory)}${path.sep}`,
      ) &&
      sourceFile.getBaseName().endsWith('.props.ts') &&
      path.basename(sourceFile.getBaseName(), '.props.ts').toLowerCase() ===
        componentName.toLowerCase(),
  );
}

function detectVisualVocabularyContracts(
  context: ConsistencyContext,
  findings: ConsistencyFinding[],
): void {
  for (const contract of visualVocabularyContracts) {
    const sourceFile = contractSourceFile(context, contract.source.file);
    if (!sourceFile) continue;
    const actual = contractValues(sourceFile, contract.source);
    if (!sameValues(actual, contract.expected)) {
      addFinding(findings, context.root, {
        rule: `visual-${contract.axis}-vocabulary`,
        severity: 'error',
        category: 'visual-consistency',
        component: contract.component,
        symbol: contract.axis,
        sourceFile,
        position: 0,
        message: `Le vocabulaire ${contract.axis} ne respecte pas la matrice officielle.`,
        evidence: `Attendu : ${contract.expected.join(' | ')}. Observé : ${actual.join(' | ') || 'aucune valeur détectée'}.`,
        remediation: `Aligner ${contract.component}.${contract.axis} sur le vocabulaire canonique sans modifier les styles associés.`,
      });
    }

    if (contract.defaultValue && contract.defaultSource) {
      const defaultSourceFile = contractSourceFile(
        context,
        contract.defaultSource,
      );
      if (!defaultSourceFile) continue;
      const actualDefault = defaultValue(defaultSourceFile, contract.axis);
      if (actualDefault !== contract.defaultValue) {
        addFinding(findings, context.root, {
          rule: `visual-${contract.axis}-default`,
          severity: 'error',
          category: 'visual-consistency',
          component: contract.component,
          symbol: contract.axis,
          sourceFile: defaultSourceFile,
          position: 0,
          message: `Le default ${contract.axis} ne respecte pas la matrice officielle.`,
          evidence: `Attendu : ${contract.defaultValue}. Observé : ${actualDefault ?? 'aucun default détecté'}.`,
          remediation: `Utiliser ${contract.defaultValue} comme valeur par défaut de ${contract.component}.${contract.axis}.`,
        });
      }

      if (contract.axis === 'size') {
        const propsFiles = componentPropsFiles(
          context,
          contract.documentationComponent ?? contract.component,
        );
        const documented = propsFiles.some((propsFile) =>
          new RegExp(
            `(?:Defaults? to|@default)[^\\n]*[\\x60'"]${contract.defaultValue}[\\x60'"]`,
            'i',
          ).test(propsFile.getFullText()),
        );
        if (!documented) {
          addFinding(findings, context.root, {
            rule: 'undocumented-public-default',
            severity: 'warning',
            category: 'visual-consistency',
            component: contract.component,
            symbol: contract.axis,
            sourceFile: propsFiles[0] ?? defaultSourceFile,
            position: 0,
            message: `Le default public ${contract.axis}=${contract.defaultValue} n'est pas documenté dans les props.`,
            evidence: `Le runtime utilise ${contract.defaultValue} dans ${repositoryPath(context.root, defaultSourceFile.getFilePath())}, mais le type public ne le documente pas.`,
            remediation:
              'Documenter la valeur par défaut dans la JSDoc de la prop publique.',
          });
        }
      }
    }
  }
}

function detectOptionalControlLabels(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles.filter((file) =>
    file.getBaseName().endsWith('.props.ts'),
  )) {
    const text = sourceFile.getFullText();
    const isControl =
      /ButtonHTMLAttributes|Tabs\.Tab\.Props|Toggle\.Props/.test(text);
    const omitsChildren = /['"]children['"]/.test(text);
    const optionalLabel = propertyPattern('label', true).test(text);
    const restoresChildren = hasProperty(text, 'children');
    const requiresAriaLabel = hasRequiredProperty(text, 'aria-label');
    if (
      !isControl ||
      !omitsChildren ||
      !optionalLabel ||
      restoresChildren ||
      requiresAriaLabel
    ) {
      continue;
    }
    const component = componentForFile(
      context.components,
      sourceFile.getFilePath(),
    );
    addFinding(findings, context.root, {
      rule: 'inaccessible-optional-label',
      severity: 'error',
      category: 'accessibility',
      component: component?.name,
      symbol: 'label',
      sourceFile,
      position: text.search(propertyPattern('label', true)),
      message:
        'Le contrôle interdit children mais rend label optionnel sans imposer de nom accessible.',
      evidence: 'children omis + label optionnel + aria-label non requis',
      remediation:
        'Rendre label obligatoire ou imposer aria-label dans le mode icône-seule.',
    });
  }
}

function detectObservableAriaProblems(
  context: ConsistencyContext,
  publicFiles: SourceFile[],
  findings: ConsistencyFinding[],
): void {
  for (const sourceFile of publicFiles.filter((file) =>
    file.getFilePath().endsWith('.tsx'),
  )) {
    const text = sourceFile.getFullText();
    const component = componentForFile(
      context.components,
      sourceFile.getFilePath(),
    );
    const progressPosition = text.search(/role=\{?['"]progressbar['"]}?/);
    if (
      progressPosition >= 0 &&
      /aria-label=\{label}/.test(text) &&
      !/aria-labelledby=/.test(text)
    ) {
      addFinding(findings, context.root, {
        rule: 'unnamed-progressbar',
        severity: 'error',
        category: 'accessibility',
        component: component?.name,
        sourceFile,
        position: progressPosition,
        message:
          "Le progressbar peut être rendu sans nom lorsque label n'est pas fourni.",
        evidence: 'role="progressbar" avec aria-label={label} uniquement',
        remediation:
          'Exiger label, aria-label ou aria-labelledby et cibler le nœud progressbar.',
      });
    }

    const separatorPosition = text.search(/role=\{?['"]separator['"]}?/);
    if (
      separatorPosition >= 0 &&
      /\borientation\b/.test(text) &&
      !/aria-orientation=/.test(text)
    ) {
      addFinding(findings, context.root, {
        rule: 'separator-orientation',
        severity: 'error',
        category: 'accessibility',
        component: component?.name,
        sourceFile,
        position: separatorPosition,
        message:
          "L'orientation visuelle du separator n'est pas transmise à aria-orientation.",
        evidence: 'role="separator" sans aria-orientation',
        remediation:
          'Piloter la recette et aria-orientation avec la même prop orientation.',
      });
    }

    const rawRolePosition = text.search(/role=\{role}/);
    if (rawRolePosition >= 0) {
      const directory = path.dirname(sourceFile.getFilePath());
      const exposesNone = context.sourceFiles.some(
        (candidate) =>
          normalize(candidate.getFilePath()).startsWith(
            `${normalize(directory)}${path.sep}`,
          ) && /['"]none['"]/.test(candidate.getFullText()),
      );
      if (exposesNone) {
        addFinding(findings, context.root, {
          rule: 'role-none-sentinel',
          severity: 'warning',
          category: 'accessibility',
          component: component?.name,
          sourceFile,
          position: rawRolePosition,
          message:
            "La valeur publique role='none' est rendue littéralement au lieu de supprimer le rôle.",
          evidence: 'role={role} avec une union publique contenant "none"',
          remediation:
            'Traduire la sentinelle none en undefined avant le rendu, comme Toast.',
        });
      }
    }
  }
}

function detectCompoundExportProblems(
  context: ConsistencyContext,
  findings: ConsistencyFinding[],
): void {
  const roots = context.components.filter(
    (component) =>
      component.scope === 'public' &&
      component.parentComponents.length === 0 &&
      component.subComponents.length > 0,
  );

  for (const component of roots) {
    const directory = path.dirname(component.sourcePath);
    const indexFile = context.sourceFiles.find(
      (sourceFile) =>
        normalize(sourceFile.getFilePath()) ===
        normalize(path.join(directory, 'index.ts')),
    );
    if (!indexFile) continue;
    const exportedNames = new Set(
      indexFile.getExportSymbols().map((symbol) => symbol.getName()),
    );
    const relatedFiles = context.sourceFiles.filter((sourceFile) =>
      normalize(sourceFile.getFilePath()).startsWith(
        `${normalize(directory)}${path.sep}`,
      ),
    );
    const compoundAliases = relatedFiles.flatMap((sourceFile) =>
      sourceFile
        .getTypeAliases()
        .filter((alias) => alias.getName().endsWith('Compound')),
    );

    for (const alias of compoundAliases) {
      for (const property of alias.getDescendantsOfKind(
        SyntaxKind.PropertySignature,
      )) {
        const typeText = property.getTypeNode()?.getText() ?? '';
        const typeName = /^typeof\s+([A-Za-z]\w*)$/.exec(typeText)?.[1];
        if (!typeName) continue;
        const propsName = `${typeName}Props`;
        const propsDeclaration = relatedFiles
          .flatMap((sourceFile) => [
            sourceFile.getTypeAlias(propsName),
            sourceFile.getInterface(propsName),
          ])
          .find((declaration) => declaration !== undefined);

        if (propsDeclaration && !exportedNames.has(propsName)) {
          addFinding(findings, context.root, {
            rule: 'missing-compound-slot-props-export',
            severity: 'error',
            category: 'exports',
            component: component.name,
            symbol: propsName,
            sourceFile: property.getSourceFile(),
            position: property.getStart(),
            message: `Le slot ${component.name}.${property.getName()} est public mais ${propsName} ne l'est pas.`,
            evidence: `${typeText} possède un type ${propsName} non exporté par le barrel du composant.`,
            remediation: `Exporter explicitement ${propsName} depuis ${repositoryPath(context.root, indexFile.getFilePath())}.`,
          });
        }

        if (exportedNames.has(typeName)) {
          addFinding(findings, context.root, {
            rule: 'duplicate-flat-compound-slot-export',
            severity: 'warning',
            category: 'exports',
            component: component.name,
            symbol: typeName,
            sourceFile: indexFile,
            position: indexFile.getFullText().indexOf(typeName),
            message: `${typeName} est exporté à plat et via ${component.name}.${property.getName()}.`,
            evidence: `Deux chemins publics exposent la même valeur de slot.`,
            remediation:
              'Conserver la valeur sous le namespace composé et exporter seulement son type de props à plat.',
          });
        }
      }
    }
  }
}

function detectMissingComponentJsDoc(
  context: ConsistencyContext,
  findings: ConsistencyFinding[],
): void {
  // Only check component source files: .tsx, not stories/tests, not in
  // styles/hooks/utils/context subdirectories.
  const componentSources = context.components.filter(
    (component) =>
      component.scope === 'public' &&
      component.sourcePath.endsWith('.tsx') &&
      !/(^|[\\/])(styles|hooks|utils|context)([\\/]|$)/.test(
        component.sourcePath,
      ),
  );

  for (const component of componentSources) {
    const sourceFile = context.sourceFiles.find(
      (candidate) =>
        normalize(candidate.getFilePath()) === normalize(component.sourcePath),
    );
    if (!sourceFile) continue;

    const expectedName = component.name;

    // Find the top-level statement that declares the main component value.
    let declarationPosition: number | undefined;
    let hasJsDoc = false;

    for (const statement of sourceFile.getStatements()) {
      if (Node.isVariableStatement(statement)) {
        const match = statement
          .getDeclarations()
          .find((declaration) => declaration.getName() === expectedName);
        if (match) {
          declarationPosition = statement.getStart();
          hasJsDoc = statement.getJsDocs().length > 0;
          break;
        }
      }
      if (
        Node.isFunctionDeclaration(statement) &&
        statement.getName() === expectedName
      ) {
        declarationPosition = statement.getStart();
        hasJsDoc = statement.getJsDocs().length > 0;
        break;
      }
    }

    if (declarationPosition === undefined || hasJsDoc) continue;

    addFinding(findings, context.root, {
      rule: 'missing-component-jsdoc',
      severity: 'error',
      category: 'documentation',
      component: component.name,
      sourceFile,
      position: declarationPosition,
      message: `Le composant public ${expectedName} n'a pas de JSDoc adjacent à son implémentation.`,
      evidence: `Aucun commentaire /** ... */ immédiatement avant la déclaration de ${expectedName} dans ${sourceFile.getBaseName()}.`,
      remediation:
        'Ajouter un commentaire JSDoc /** ... */ immédiatement avant la déclaration du composant.',
    });
  }
}

function detectThemeProblems(
  context: ConsistencyContext,
  findings: ConsistencyFinding[],
): void {
  const sourceByPath = new Map(
    context.sourceFiles.map((sourceFile) => [
      normalize(sourceFile.getFilePath()),
      sourceFile,
    ]),
  );
  const themeIndex = sourceByPath.get(
    normalize(path.join(context.root, 'src', 'theme', 'index.ts')),
  );
  const packageIndex = sourceByPath.get(
    normalize(path.join(context.root, 'src', 'index.ts')),
  );
  if (themeIndex && packageIndex) {
    const themeNames = new Set(
      themeIndex.getExportSymbols().map((symbol) => symbol.getName()),
    );
    const packageNames = new Set(
      packageIndex.getExportSymbols().map((symbol) => symbol.getName()),
    );
    const missing = [...themeNames]
      .filter((name) => !packageNames.has(name))
      .sort();
    if (missing.length > 0) {
      addFinding(findings, context.root, {
        rule: 'theme-barrel-not-public',
        severity: 'error',
        category: 'theme',
        symbol: missing.join(', '),
        sourceFile: packageIndex,
        position: 0,
        message:
          "Le barrel de thème expose des symboles qui n'atteignent pas l'entrée du package.",
        evidence: `Exports absents : ${missing.join(', ')}`,
        remediation:
          'Réexporter le barrel public du thème depuis src/index.ts ou déclarer un sous-chemin package.',
      });
    }
  }

  const overrideFile = sourceByPath.get(
    normalize(path.join(context.root, 'src', 'theme', 'override.ts')),
  );
  if (overrideFile) {
    const text = overrideFile.getFullText();
    const position = text.search(
      /\{\s*\.\.\.vars\.color\s*,\s*\.\.\.colors\s*}/,
    );
    if (position >= 0 && /assignVars\s*\(\s*vars\.color/.test(text)) {
      addFinding(findings, context.root, {
        rule: 'partial-theme-self-reference',
        severity: 'error',
        category: 'theme',
        symbol: 'overrideColors',
        sourceFile: overrideFile,
        position,
        message:
          'Un override partiel réassigne les tokens absents à leur propre variable CSS.',
        evidence:
          '{ ...vars.color, ...colors } passé à assignVars(vars.color, ...)',
        remediation: 'Déclarer uniquement les variables présentes dans colors.',
      });
    }
  }
}

function findingKey(findingValue: ConsistencyFinding): string {
  return [
    findingValue.rule,
    findingValue.component ?? '',
    findingValue.symbol ?? '',
    findingValue.file,
    findingValue.line,
  ].join(':');
}

function severityOrder(severity: ConsistencyFindingSeverity): number {
  return severity === 'error' ? 0 : 1;
}

function categoryOrder(category: ConsistencyFindingCategory): string {
  return category;
}

export function detectConsistency(
  context: ConsistencyContext,
): ConsistencyFinding[] {
  const findings: ConsistencyFinding[] = [];
  const publicFiles = context.sourceFiles.filter(
    (sourceFile) =>
      (context.publicExports.get(normalize(sourceFile.getFilePath()))?.size ??
        0) > 0,
  );

  detectVanillaExtractTypeDependencies(context, publicFiles, findings);
  detectBroadIndexSignatures(context, publicFiles, findings);
  detectPublicAny(context, publicFiles, findings);
  detectNonCanonicalPublicProps(context, findings);
  detectFabricatedEvents(context, publicFiles, findings);
  detectIncompleteControlledTriplets(context, publicFiles, findings);
  detectControlledStateInitializers(context, publicFiles, findings);
  detectVisualVocabularyContracts(context, findings);
  detectOptionalControlLabels(context, publicFiles, findings);
  detectObservableAriaProblems(context, publicFiles, findings);
  detectCompoundExportProblems(context, findings);
  detectThemeProblems(context, findings);
  detectMissingComponentJsDoc(context, findings);

  return [
    ...new Map(findings.map((item) => [findingKey(item), item])).values(),
  ].sort(
    (left, right) =>
      severityOrder(left.severity) - severityOrder(right.severity) ||
      categoryOrder(left.category).localeCompare(
        categoryOrder(right.category),
      ) ||
      left.file.localeCompare(right.file) ||
      left.line - right.line ||
      left.rule.localeCompare(right.rule),
  );
}

export const consistencyCoverage = {
  automated: automatedMatrixCoverage,
  consumerApi: consumerApiMatrixCoverage,
  manualLimitations: manualMatrixLimitations,
};
