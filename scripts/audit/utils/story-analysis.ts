import path from 'node:path';
import { Node, SyntaxKind, type SourceFile } from 'ts-morph';
import type { ComponentInfo } from '../types/index.ts';

export type StoryFinding = {
  rule: string;
  severity: 'error';
  file: string;
  line: number;
  message: string;
  remediation: string;
};

type StoryAudit = {
  findings: StoryFinding[];
  storyCount: number;
};

type ShowcaseRule = {
  prop: string;
  story: string;
  label: string;
};

const showcaseRules: ShowcaseRule[] = [
  { prop: 'variant', story: 'Variants', label: 'variantes' },
  { prop: 'color', story: 'Colors', label: 'couleurs' },
  { prop: 'size', story: 'Sizes', label: 'tailles' },
  { prop: 'fontSize', story: 'FontSizes', label: 'tailles de police' },
  { prop: 'fontWeight', story: 'FontWeights', label: 'graisses de police' },
  { prop: 'orientation', story: 'Orientations', label: 'orientations' },
  { prop: 'status', story: 'Statuses', label: 'statuts' },
];

const interactiveStateProps = [
  'active',
  'checked',
  'disabled',
  'loading',
  'pressed',
  'selected',
] as const;

function repositoryPath(root: string, filePath: string): string {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function lineAt(sourceFile: SourceFile, position: number): number {
  return sourceFile.getLineAndColumnAtPos(position).line;
}

function addFinding(
  findings: StoryFinding[],
  root: string,
  sourceFile: SourceFile,
  rule: string,
  position: number,
  message: string,
  remediation: string,
): void {
  findings.push({
    rule,
    severity: 'error',
    file: repositoryPath(root, sourceFile.getFilePath()),
    line: lineAt(sourceFile, position),
    message,
    remediation,
  });
}

function isComponentStory(root: string, sourceFile: SourceFile): boolean {
  const relativePath = repositoryPath(root, sourceFile.getFilePath());
  return (
    relativePath.startsWith('src/stories/') &&
    relativePath.endsWith('.stories.tsx') &&
    !relativePath.startsWith('src/stories/overview/')
  );
}

function storyExportCount(sourceFile: SourceFile): number {
  return sourceFile
    .getVariableStatements()
    .filter((statement) => statement.isExported()).length;
}

function storyExportNames(sourceFile: SourceFile): Set<string> {
  return new Set(
    sourceFile
      .getVariableStatements()
      .filter((statement) => statement.isExported())
      .flatMap((statement) =>
        statement.getDeclarationList().getDeclarations().map((declaration) =>
          declaration.getName(),
        ),
      ),
  );
}

function componentNameForStory(sourceFile: SourceFile): string {
  return sourceFile.getBaseName().replace(/\.stories\.tsx$/, '');
}

function argTypeNames(sourceFile: SourceFile): Set<string> {
  const metaDeclaration = sourceFile.getVariableDeclaration('meta');
  const metaExpression = metaDeclaration?.getInitializer();
  const metaInitializer = Node.isSatisfiesExpression(metaExpression)
    ? metaExpression
        .getExpression()
        .asKind(SyntaxKind.ObjectLiteralExpression)
    : metaExpression?.asKind(SyntaxKind.ObjectLiteralExpression);
  const argTypes = metaInitializer
    ?.getProperty('argTypes')
    ?.asKind(SyntaxKind.PropertyAssignment)
    ?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
  if (!argTypes) return new Set();

  return new Set(
    argTypes
      .getProperties()
      .filter(Node.isPropertyAssignment)
      .map((property) => property.getName().replace(/^['"]|['"]$/g, '')),
  );
}

function hasAccessibilityTable(source: string): boolean {
  return (
    source.includes('Accessibility') &&
    /\|\s*Prop\s*\/\s*Attribute\s*\|\s*Required\s*\|\s*Type\s*\|\s*Notes\s*\|/.test(
      source,
    )
  );
}

function accessibilitySectionCount(source: string): number {
  return source.match(/\*\*Accessibility\*\*/g)?.length ?? 0;
}

function componentDescriptionHasSection(
  source: string,
  section: string,
): boolean {
  return new RegExp(
    `\\bdescription\\s*:\\s*\\{\\s*component\\s*:[\\s\\S]*?\\*\\*${section}\\*\\*`,
  ).test(source);
}

function hasMarkdownSubcomponentsSection(source: string): boolean {
  return /\b(?:const|let)\s+\w+\s*=\s*md[\s\S]*?(?:\*\*Sub-components\*\*|## Sub-components)/.test(
    source,
  );
}

function sourceCodeHasAlignedProps(sourceFile: SourceFile): number | undefined {
  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    if (call.getExpression().getText() !== 'storySource') continue;

    const argument = call.getArguments()[0];
    if (!argument || !Node.isNoSubstitutionTemplateLiteral(argument)) continue;

    const alignedLine = argument
      .getLiteralText()
      .split('\n')
      .find((line) => /\S {2,}[A-Za-z][\w-]*=/.test(line));
    if (alignedLine) return argument.getStart();
  }
}

export function analyzeComponentStories(
  root: string,
  sourceFiles: SourceFile[],
  components: ComponentInfo[],
): StoryAudit {
  const stories = sourceFiles.filter((sourceFile) =>
    isComponentStory(root, sourceFile),
  );
  const findings: StoryFinding[] = [];

  for (const sourceFile of stories) {
    const source = sourceFile.getFullText();
    const docsPagePosition = source.search(/\bpage\s*:/);
    const controlsPosition = source.search(/<Controls\b/);
    const accessibilityPosition = source.search(/<Markdown\b/);
    const storiesPosition = source.search(/<Stories\b/);
    const playgroundPosition = source.search(
      /export\s+const\s+Playground\b/,
    );
    const storySourceCallCount = sourceFile
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .filter((call) => call.getExpression().getText() === 'storySource')
      .length;
    const exportedStories = storyExportCount(sourceFile);
    const exportedStoryNames = storyExportNames(sourceFile);
    const component = components.find(
      (candidate) =>
        candidate.scope === 'public' &&
        candidate.name === componentNameForStory(sourceFile),
    );

    if (!/\bdescription\s*:\s*\{[\s\S]*?\bcomponent\s*:/.test(source)) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-component-description',
        0,
        'La story ne documente pas le composant avec `docs.description.component`.',
        'Ajouter une description orientée consommateur dans les paramètres Docs du meta.',
      );
    }

    if (playgroundPosition === -1) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-playground',
        0,
        'La story ne fournit pas de playground interactif exporté sous le nom `Playground`.',
        'Ajouter une story `Playground` couvrant les props publiques contrôlables du composant.',
      );
    }

    if (
      docsPagePosition === -1 ||
      controlsPosition === -1 ||
      storiesPosition === -1 ||
      !/<Stories\s+includePrimary=\{false\}\s*\/>/.test(source)
    ) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-docs-page',
        0,
        'La story ne contrôle pas sa page Docs pour afficher un playground primaire unique.',
        'Définir une page Docs avec `Canvas`, `Controls` et `<Stories includePrimary={false} />`.',
      );
    }

    if (!hasAccessibilityTable(source)) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-accessibility-table',
        0,
        'La story ne contient pas le tableau d’accessibilité standard.',
        'Ajouter un tableau Markdown décrivant les props et attributs d’accessibilité pertinents.',
      );
    }

    if (accessibilitySectionCount(source) > 1) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-duplicate-accessibility',
        0,
        'La story contient plusieurs sections d’accessibilité dupliquées.',
        'Conserver un seul tableau d’accessibilité dans le bloc Markdown placé après `<Controls />`.',
      );
    }

    if (
      controlsPosition === -1 ||
      accessibilityPosition === -1 ||
      controlsPosition > accessibilityPosition
    ) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-accessibility-order',
        0,
        'Le contenu d’accessibilité ne suit pas les Controls dans la page Docs.',
        'Placer le bloc Markdown d’accessibilité immédiatement après `<Controls />`.',
      );
    }

    const hasSubcomponentsSection =
      /\*\*Sub-components\*\*|## Sub-components/.test(source);
    if (hasSubcomponentsSection) {
      if (componentDescriptionHasSection(source, 'Sub-components')) {
        addFinding(
          findings,
          root,
          sourceFile,
          'story-subcomponents-order',
          0,
          'Le tableau des sous-composants est placé dans la description du composant.',
          'Placer le tableau dans un bloc Markdown rendu après `<Controls />` dans la page Docs.',
        );
      }

      if (!hasMarkdownSubcomponentsSection(source)) {
        addFinding(
          findings,
          root,
          sourceFile,
          'story-subcomponents-table',
          0,
          'La story ne contient pas de tableau des sous-composants dans un bloc Markdown dédié.',
          'Ajouter le tableau `Sub-components` dans le contenu Markdown rendu après `<Controls />`.',
        );
      }
    }

    if (
      exportedStories > 0 &&
      (storySourceCallCount === 0 || storySourceCallCount < exportedStories)
    ) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-source-code',
        0,
        'Chaque story exportée ne fournit pas un extrait Storybook contrôlé.',
        'Utiliser `storySource` pour chaque story exportée afin d’afficher un exemple consommateur sans `render()` interne.',
      );
    }

    if (component) {
      const componentProps = new Set([
        ...component.props.map((prop) => prop.name),
        ...argTypeNames(sourceFile),
      ]);
      for (const rule of showcaseRules) {
        if (!componentProps.has(rule.prop)) continue;
        if (rule.prop === 'color' && component.category === 'foundation') {
          continue;
        }
        if (exportedStoryNames.has(rule.story)) continue;

        addFinding(
          findings,
          root,
          sourceFile,
          'story-canonical-showcase',
          0,
          `La prop publique \`${rule.prop}\` n’a pas de story \`${rule.story}\` dédiée aux ${rule.label}.`,
          `Ajouter la story \`${rule.story}\` pour comparer toutes les valeurs publiques de \`${rule.prop}\`.`,
        );
      }

      if (
        interactiveStateProps.some((prop) => componentProps.has(prop)) &&
        !exportedStoryNames.has('States')
      ) {
        addFinding(
          findings,
          root,
          sourceFile,
          'story-canonical-showcase',
          0,
          'Les états interactifs publics n’ont pas de story `States` dédiée.',
          'Ajouter la story `States` pour montrer les états interactifs publics du composant.',
        );
      }

      if (
        (componentProps.has('startIcon') || componentProps.has('endIcon')) &&
        !exportedStoryNames.has('WithIcons')
      ) {
        addFinding(
          findings,
          root,
          sourceFile,
          'story-canonical-showcase',
          0,
          'Les props `startIcon` ou `endIcon` n’ont pas de story `WithIcons` dédiée.',
          'Ajouter la story `WithIcons` pour comparer les icônes de début, de fin et leur combinaison.',
        );
      }

      const isFieldWrapperStory = /\bcomponent\s*:\s*[^,\n]*Field\b/.test(
        source,
      );
      const hasCompoundPublicApi = component.exports.includes(
        `${component.name}Compound`,
      );

      if (
        component.subComponents.length > 0 &&
        hasCompoundPublicApi &&
        !isFieldWrapperStory
      ) {
        if (componentDescriptionHasSection(source, 'Sub-components')) {
          addFinding(
            findings,
            root,
            sourceFile,
            'story-subcomponents-order',
            0,
            'Le tableau des sous-composants est placé dans la description du composant.',
            'Rendre le tableau via un bloc `<Markdown>` après `<Controls />` dans la page Docs.',
          );
        }

        const missingCompoundControls = component.subComponents
          .map((subComponent) =>
            subComponent.startsWith(component.name)
              ? subComponent.slice(component.name.length)
              : subComponent,
          )
          .filter(
            (slotName) => !source.includes(`Compound: ${slotName}`),
          );
        if (missingCompoundControls.length > 0) {
          addFinding(
            findings,
            root,
            sourceFile,
            'story-compound-controls',
            0,
            `Les slots publics ${missingCompoundControls.map((slot) => `\`${slot}\``).join(', ')} n’ont pas de Controls dédiés.`,
            'Ajouter au playground un argType par slot manquant, catégorisé `Compound: <NomDuSlot>`, et faire varier le rendu avec sa valeur.',
          );
        }
      }
    }

    const alignedPropsPosition = sourceCodeHasAlignedProps(sourceFile);
    if (alignedPropsPosition !== undefined) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-source-prop-alignment',
        alignedPropsPosition,
        'Un extrait `storySource` aligne artificiellement les props avec plusieurs espaces.',
        'Utiliser un seul espace entre les props dans les extraits affichés aux consommateurs.',
      );
    }

    const separatorPosition = source.search(/\/\/.*─/);
    if (separatorPosition !== -1) {
      addFinding(
        findings,
        root,
        sourceFile,
        'story-decorative-separator',
        separatorPosition,
        'La story contient un séparateur décoratif avec des caractères `─`.',
        'Supprimer les séparateurs décoratifs et conserver seulement des commentaires utiles.',
      );
    }
  }

  return { findings, storyCount: stories.length };
}
