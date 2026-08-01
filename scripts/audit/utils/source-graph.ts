import path from 'node:path';
import { Project, type SourceFile } from 'ts-morph';
import { baseNativeProps } from '../constants/index.ts';

export function normalize(filePath: string): string {
  return path.normalize(filePath);
}

export function buildSourceGraph(root: string, componentsRoot: string) {
  const nativeProps = new Set(baseNativeProps);

  const project = new Project({
    tsConfigFilePath: path.join(root, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });
  project.addSourceFilesAtPaths([
    path.join(componentsRoot, '**', '*.ts'),
    path.join(componentsRoot, '**', '*.tsx'),
  ]);

  const nativePropsSource = project.createSourceFile(
    path.join(root, '.audit-native-props.ts'),
    `import type * as React from 'react';
type NativePropNames =
  | keyof React.HTMLAttributes<HTMLElement>
  | keyof React.AllHTMLAttributes<HTMLElement>
  | keyof React.SVGProps<SVGSVGElement>
  | keyof React.DOMAttributes<HTMLElement>;
`,
    { overwrite: true },
  );
  const nativePropNames = nativePropsSource
    .getTypeAliasOrThrow('NativePropNames')
    .getType()
    .getUnionTypes()
    .flatMap((type) => {
      if (!type.isStringLiteral()) return [];
      const literalValue = type.getLiteralValue();
      return typeof literalValue === 'string' ? [literalValue] : [];
    });
  nativePropNames.forEach((name) => nativeProps.add(name));

  const sourceFiles = project.getSourceFiles();
  const sourceByPath = new Map(
    sourceFiles.map((sourceFile) => [
      normalize(sourceFile.getFilePath()),
      sourceFile,
    ]),
  );

  function isUnderComponents(filePath: string): boolean {
    return normalize(filePath).startsWith(
      `${normalize(componentsRoot)}${path.sep}`,
    );
  }

  function sourceFileForSpecifier(
    specifier: string,
    fromFile: SourceFile,
  ): SourceFile | undefined {
    let base: string;
    if (specifier.startsWith('@components')) {
      base = path.join(componentsRoot, specifier.slice('@components'.length));
    } else if (specifier.startsWith('@/')) {
      base = path.join(root, 'src', specifier.slice(2));
    } else if (specifier.startsWith('.')) {
      base = path.resolve(path.dirname(fromFile.getFilePath()), specifier);
    } else {
      return undefined;
    }

    const candidates = [
      base,
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, 'index.ts'),
      path.join(base, 'index.tsx'),
    ];
    return candidates
      .map((candidate) => sourceByPath.get(normalize(candidate)))
      .find((candidate): candidate is SourceFile => candidate !== undefined);
  }

  function exportedNames(sourceFile: SourceFile): string[] {
    return sourceFile
      .getExportSymbols()
      .map((symbol) => symbol.getName())
      .filter((name) => name !== 'default');
  }

  const publicExports = new Map<string, Set<string>>();
  const visitedExports = new Set<string>();

  function addPublicExport(sourceFile: SourceFile, name: string): void {
    const key = normalize(sourceFile.getFilePath());
    const names = publicExports.get(key) ?? new Set<string>();
    names.add(name);
    publicExports.set(key, names);
  }

  function walkPublicExports(sourceFile: SourceFile): void {
    const fileKey = normalize(sourceFile.getFilePath());
    if (visitedExports.has(fileKey)) return;
    visitedExports.add(fileKey);

    for (const declaration of sourceFile.getExportDeclarations()) {
      const target =
        declaration.getModuleSpecifierSourceFile() ??
        sourceFileForSpecifier(
          declaration.getModuleSpecifierValue() ?? '',
          sourceFile,
        );
      if (!target) continue;

      const namedExports = declaration.getNamedExports();
      if (namedExports.length > 0) {
        for (const namedExport of namedExports) {
          addPublicExport(
            target,
            namedExport.getAliasNode()?.getText() ?? namedExport.getName(),
          );
        }
      } else {
        for (const name of exportedNames(target)) addPublicExport(target, name);
      }
      walkPublicExports(target);
    }
  }

  const publicRoot = sourceByPath.get(
    normalize(path.join(componentsRoot, 'index.ts')),
  );
  if (publicRoot) walkPublicExports(publicRoot);
  const rootExportNames = new Set(publicRoot ? exportedNames(publicRoot) : []);

  return {
    sourceFiles,
    sourceByPath,
    publicExports,
    rootExportNames,
    nativeProps,
    isUnderComponents,
    sourceFileForSpecifier,
    exportedNames,
  };
}
