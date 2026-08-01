import path from 'node:path';
import { Node, type SourceFile, SyntaxKind, type TypeNode } from 'ts-morph';
import type { ComponentInfo, PropInfo } from '../types/index.ts';
import {
  categoryNames,
  semanticColorTokens,
  semanticSizeTokens,
  statusToneTokens,
} from '../constants/index.ts';
import { normalize } from './source-graph.ts';


type SourceGraphContext = {
  sourceFiles: SourceFile[];
  sourceByPath: Map<string, SourceFile>;
  publicExports: Map<string, Set<string>>;
  rootExportNames: Set<string>;
  nativeProps: Set<string>;
  componentsRoot: string;
  isUnderComponents: (filePath: string) => boolean;
  sourceFileForSpecifier: (
    specifier: string,
    fromFile: SourceFile,
  ) => SourceFile | undefined;
  exportedNames: (sourceFile: SourceFile) => string[];
};

function isComponentSource(sourceFile: SourceFile): boolean {
  const filePath = sourceFile.getFilePath();
  if (!filePath.endsWith('.tsx')) return false;
  if (/\.(stories|test)\.tsx?$/.test(filePath)) return false;
  if (/(^|[\\/])(styles|hooks|utils|context)([\\/]|$)/.test(filePath))
    return false;
  return sourceFile.getDefaultExportSymbol() !== undefined;
}

function componentName(sourceFile: SourceFile): string {
  const defaultExport = sourceFile.getDefaultExportSymbol();
  const declaration = defaultExport?.getDeclarations()[0];
  if (declaration && Node.isVariableDeclaration(declaration))
    return declaration.getName();
  if (
    declaration &&
    Node.isFunctionDeclaration(declaration) &&
    declaration.getName()
  ) {
    return declaration.getName() as string;
  }
  return path.basename(sourceFile.getBaseName(), '.tsx');
}

function componentDirectory(sourceFile: SourceFile): string {
  return path.dirname(sourceFile.getFilePath());
}

function propertyEntries(
  typeNode: TypeNode | Node | undefined,
  seen = new Set<string>(),
): PropInfo[] {
  const result: PropInfo[] = [];
  if (!typeNode) return result;
  const addProperty = (property: Node): void => {
    if (!Node.isPropertySignature(property)) return;
    const name = property.getName().replace(/^['"]|['"]$/g, '');
    if (result.some((item) => item.name === name)) return;
    result.push({
      name,
      type: property.getTypeNode()?.getText() ?? 'unknown',
    });
  };

  if (Node.isTypeLiteral(typeNode)) {
    typeNode.getMembers().forEach(addProperty);
  } else if (
    Node.isIntersectionTypeNode(typeNode) ||
    Node.isUnionTypeNode(typeNode)
  ) {
    for (const child of typeNode.getTypeNodes()) {
      result.push(...propertyEntries(child, seen));
    }
  } else if (Node.isInterfaceDeclaration(typeNode)) {
    for (const member of typeNode.getMembers()) addProperty(member);
    for (const base of typeNode.getExtends()) {
      result.push(...propertyEntries(base, seen));
    }
  } else if (Node.isTypeReference(typeNode)) {
    const declaration = typeNode
      .getTypeName()
      .getSymbol()
      ?.getDeclarations()[0];
    if (declaration && !seen.has(declaration.getSourceFile().getFilePath())) {
      seen.add(declaration.getSourceFile().getFilePath());
      if (Node.isTypeAliasDeclaration(declaration)) {
        result.push(...propertyEntries(declaration.getTypeNode(), seen));
      } else if (Node.isInterfaceDeclaration(declaration)) {
        for (const member of declaration.getMembers()) addProperty(member);
        for (const base of declaration.getExtends()) {
          result.push(...propertyEntries(base, seen));
        }
      }
    }
  }
  return result;
}

function literalValues(node: Node): string[] {
  if (Node.isAsExpression(node) || Node.isParenthesizedExpression(node)) {
    return literalValues(node.getExpression());
  }
  if (Node.isArrayLiteralExpression(node)) {
    return node.getElements().flatMap(literalValues);
  }
  if (Node.isObjectLiteralExpression(node)) {
    return node.getProperties().flatMap((property) => {
      if (Node.isPropertyAssignment(property))
        return literalValues(property.getInitializerOrThrow());
      if (Node.isShorthandPropertyAssignment(property))
        return [property.getName()];
      return [];
    });
  }
  if (Node.isStringLiteral(node) || Node.isNumericLiteral(node))
    return [String(node.getLiteralValue())];
  return [];
}

function recipeAxisValues(node: Node, axis: string): string[] {
  const values: string[] = [];
  node.forEachDescendant((descendant) => {
    if (!Node.isPropertyAssignment(descendant)) return;
    if (descendant.getName() !== 'variants') return;
    const variants = descendant.getInitializerIfKind(
      SyntaxKind.ObjectLiteralExpression,
    );
    if (!variants) return;
    for (const variant of variants.getProperties()) {
      if (!Node.isPropertyAssignment(variant)) continue;
      if (variant.getName() !== axis) continue;
      const variantValues = variant
        .getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
        ?.getProperties()
        .filter((property) => Node.isPropertyAssignment(property))
        .map((property) => property.getName())
        .filter((value) => !value.includes('['));
      if (variantValues) values.push(...variantValues);
    }
  });
  return values;
}

function categoryForName(name: string): string | undefined {
  const lower = name.toLowerCase();
  if (/^on[A-Z]/.test(name)) return undefined;
  if (lower.includes('size')) return 'size';
  if (lower.includes('color')) return 'color';
  if (/^(status|tone|intent)([A-Z]|$)/.test(name)) return 'variant';
  if (lower.includes('variant')) return 'variant';
  return undefined;
}

function isStylingProp(name: string): boolean {
  return (
    name === 'style' ||
    name === 'className' ||
    name === 'color' ||
    /^(align|aspectRatio|background|border[A-Z]|bottom|boxShadow|columnGap|display|flex|font|gap|grid|height|justify|letterSpacing|lineHeight|margin|maxHeight|maxWidth|minHeight|minWidth|object|opacity|overflow|padding|position|right|rowGap|text|top|width|whiteSpace|zIndex)/.test(
      name,
    )
  );
}

function isRawDimension(value: string): boolean {
  return /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|ch|ex|vmin|vmax)$/.test(value);
}

function addClassifiedValue(
  info: ComponentInfo,
  category: string,
  values: string[],
  sourceName: string,
): void {
  const uniqueValues = [...new Set(values)];
  if (category === 'size') {
    for (const value of uniqueValues) {
      if (isRawDimension(value)) info.rawDimensions.push(value);
      else if (semanticSizeTokens.has(value)) info.semanticSizes.push(value);
    }
    return;
  }
  if (category === 'variant') {
    for (const value of uniqueValues) {
      if (/tone/i.test(sourceName)) info.tones.push(value);
      else if (/status|intent/i.test(sourceName)) info.statuses.push(value);
      else if (semanticColorTokens.has(value)) info.semanticColors.push(value);
      else if (statusToneTokens.has(value)) info.statuses.push(value);
      else info.variants.push(value);
    }
    return;
  }
  if (category === 'color') {
    for (const value of uniqueValues) {
      if (semanticColorTokens.has(value)) info.semanticColors.push(value);
    }
  }
}

function addValues(
  info: ComponentInfo,
  category: string,
  values: string[],
  sourceName: string,
): void {
  if (values.length === 0) return;
  addClassifiedValue(info, category, values, sourceName);
}

function isComponentConstant(name: string, compName: string): boolean {
  return name.toLowerCase().includes(compName.toLowerCase());
}

function isTechnicalExport(name: string): boolean {
  return (
    /(?:^|_)(?:STYLES?|RECIPE|SPRINKLES?|VARS|CLASS_NAMES?)(?:_|$)/i.test(
      name,
    ) || /(?:styles?|recipe|sprinkles|classNames|vars)$/i.test(name)
  );
}

function isNativeProp(name: string, nativeProps: Set<string>): boolean {
  return (
    nativeProps.has(name) ||
    name.startsWith('aria-') ||
    name.startsWith('data-') ||
    /^aria[A-Z]/.test(name) ||
    /^data[A-Z]/.test(name)
  );
}

export function analyzeComponents(
  context: SourceGraphContext,
): ComponentInfo[] {
  const {
    sourceFiles,
    sourceByPath,
    publicExports,
    rootExportNames,
    nativeProps,
    componentsRoot,
    isUnderComponents,
    sourceFileForSpecifier,
    exportedNames,
  } = context;

  function collectComponentFiles(sourceFile: SourceFile): SourceFile[] {
    const result = new Map<string, SourceFile>();
    const pending = [sourceFile];
    while (pending.length > 0) {
      const current = pending.pop() as SourceFile;
      const key = normalize(current.getFilePath());
      if (result.has(key)) continue;
      result.set(key, current);
      for (const declaration of current.getImportDeclarations()) {
        const target =
          declaration.getModuleSpecifierSourceFile() ??
          sourceFileForSpecifier(
            declaration.getModuleSpecifierValue(),
            current,
          );
        if (target && isUnderComponents(target.getFilePath()))
          pending.push(target);
      }
      for (const declaration of current.getExportDeclarations()) {
        const target =
          declaration.getModuleSpecifierSourceFile() ??
          sourceFileForSpecifier(
            declaration.getModuleSpecifierValue() ?? '',
            current,
          );
        const currentIsConstants = /[\\/]constants[\\/]/.test(
          current.getFilePath(),
        );
        const targetIsConstants =
          target && /[\\/]constants[\\/]/.test(target.getFilePath());
        if (
          target &&
          isUnderComponents(target.getFilePath()) &&
          (currentIsConstants || targetIsConstants)
        )
          pending.push(target);
      }
    }
    const directory = componentDirectory(sourceFile);
    for (const candidate of sourceFiles) {
      const candidatePath = candidate.getFilePath();
      const relativeCandidatePath = path.relative(directory, candidatePath);
      if (
        normalize(candidatePath).startsWith(
          `${normalize(directory)}${path.sep}`,
        ) &&
        !relativeCandidatePath.match(/(^|[\\/])components([\\/]|$)/)
      ) {
        result.set(normalize(candidatePath), candidate);
      }
    }
    return [...result.values()];
  }

  const componentSources = sourceFiles.filter(isComponentSource);
  const componentBySource = new Map<string, ComponentInfo>();

  for (const sourceFile of componentSources) {
    const name = componentName(sourceFile);
    const indexFile = sourceByPath.get(
      normalize(path.join(componentDirectory(sourceFile), 'index.ts')),
    );
    const reachableExports = indexFile
      ? exportedNames(indexFile).filter((exportName) =>
          rootExportNames.has(exportName),
        )
      : [];
    const info: ComponentInfo = {
      name,
      category:
        path
          .relative(componentsRoot, sourceFile.getFilePath())
          .split(path.sep)[0] ?? 'uncategorized',
      scope:
        (publicExports.get(normalize(sourceFile.getFilePath()))?.size ?? 0) >
          0 || reachableExports.length > 0
          ? 'public'
          : 'internal',
      props: [],
      variants: [],
      semanticSizes: [],
      semanticColors: [],
      statuses: [],
      tones: [],
      rawDimensions: [],
      stylingProps: [],
      exports: [
        ...new Set([
          ...(publicExports.get(normalize(sourceFile.getFilePath())) ?? []),
          ...reachableExports,
        ]),
      ].sort(),
      subComponents: [],
      parentComponents: [],
    };
    componentBySource.set(normalize(sourceFile.getFilePath()), info);
  }

  for (const sourceFile of componentSources) {
    const info = componentBySource.get(
      normalize(sourceFile.getFilePath()),
    ) as ComponentInfo;
    const relatedFiles = collectComponentFiles(sourceFile);

    for (const relatedFile of relatedFiles) {
      for (const declaration of relatedFile.getVariableDeclarations()) {
        if (!isComponentConstant(declaration.getName(), info.name)) continue;
        const initializer = declaration.getInitializerOrThrow();
        for (const axis of categoryNames) {
          addValues(
            info,
            axis,
            recipeAxisValues(initializer, axis),
            `${info.name}${axis}`,
          );
        }
        const category = categoryForName(declaration.getName());
        if (category)
          addValues(
            info,
            category,
            literalValues(declaration.getInitializerOrThrow()),
            declaration.getName(),
          );
      }
    }

    const propsFile = sourceFiles.find(
      (candidate) =>
        candidate.getBaseName().toLowerCase() ===
        `${info.name.toLowerCase()}.props.ts`,
    );
    const extractedProps: PropInfo[] = [];
    for (const declaration of propsFile?.getTypeAliases() ?? []) {
      extractedProps.push(...propertyEntries(declaration.getTypeNode()));
    }
    for (const declaration of propsFile?.getInterfaces() ?? []) {
      extractedProps.push(...propertyEntries(declaration));
    }

    for (const prop of extractedProps) {
      if (isStylingProp(prop.name)) info.stylingProps.push(prop.name);
      if (isNativeProp(prop.name, nativeProps)) continue;
      const category = categoryForName(prop.name);
      if (!category) continue;
      const values = [...prop.type.matchAll(/'([^']+)'|"([^"]+)"/g)].map(
        (match) => match[1] ?? match[2],
      );
      addValues(info, category, values, prop.name);
    }

    info.props = [
      ...new Map(
        extractedProps
          .filter(
            (prop) =>
              !isNativeProp(prop.name, nativeProps) &&
              !isStylingProp(prop.name),
          )
          .map((prop) => [prop.name, prop]),
      ).values(),
    ];
    info.variants = [...new Set(info.variants)].sort();
    info.semanticSizes = [...new Set(info.semanticSizes)].sort();
    info.semanticColors = [...new Set(info.semanticColors)].sort();
    info.statuses = [...new Set(info.statuses)].sort();
    info.tones = [...new Set(info.tones)].sort();
    info.rawDimensions = [...new Set(info.rawDimensions)].sort();
    info.stylingProps = [...new Set(info.stylingProps)].sort();
    info.exports = [...new Set(info.exports)]
      .filter((name) => !isTechnicalExport(name))
      .sort();
  }

  for (const [sourcePath, info] of componentBySource) {
    const directory = path.dirname(sourcePath);
    for (const [childPath, child] of componentBySource) {
      if (child === info) continue;
      const childDirectory = path.dirname(childPath);
      if (
        childDirectory.startsWith(
          `${directory}${path.sep}components${path.sep}`,
        )
      ) {
        info.subComponents.push(child.name);
        child.parentComponents.push(info.name);
      }
    }
    info.subComponents = [...new Set(info.subComponents)].sort();
    info.parentComponents = [...new Set(info.parentComponents)].sort();
  }

  return [...componentBySource.values()].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
}
