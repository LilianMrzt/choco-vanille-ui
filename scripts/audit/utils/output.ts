import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import type {
  ArchitecturalSignal,
  ComponentInfo,
  ImplementationLeak,
  VanillaExtractStyleBase,
} from '../types/index.ts';
import {
  buildComponentGroups,
  buildPropsIndex,
  buildValueIndex,
  componentKind,
} from './architecture.ts';

const execFileAsync = promisify(execFile);

type GenerateOutputsParams = {
  components: ComponentInfo[];
  implementationLeaks: ImplementationLeak[];
  vanillaExtractStyleBases: (VanillaExtractStyleBase & {
    component: string;
  })[];
  architecturalSignals: ArchitecturalSignal[];
  outputRoot: string;
  root: string;
};

export async function generateOutputs(
  params: GenerateOutputsParams,
): Promise<void> {
  const {
    components,
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    outputRoot,
    root,
  } = params;

  const outputComponents = components.map((component) => ({
    name: component.name,
    category: component.category,
    scope: component.scope,
    componentKind: componentKind(component),
    props: component.props,
    variants: component.variants,
    statuses: component.statuses,
    tones: component.tones,
    rawDimensions: component.rawDimensions,
    stylingProps: component.stylingProps,
    vanillaExtractStyleBases: component.vanillaExtractStyleBases,
    exports: component.exports,
    subComponents: component.subComponents,
    parentComponents: component.parentComponents,
    api: {
      propCount: component.props.length,
      variantCount: component.variants.length,
      subComponentCount: component.subComponents.length,
      hasImplementationLeak: implementationLeaks.some(
        (leak) => leak.component === component.name,
      ),
      hasVanillaExtractStyleBase: component.vanillaExtractStyleBases.length > 0,
    },
  }));

  const libraryMap = {
    schemaVersion: 5,
    generatedAt: new Date().toISOString(),
    componentGroups: buildComponentGroups(components),
    components: outputComponents,
    indexes: {
      props: buildPropsIndex(components),
      variants: buildValueIndex(components, (component) => component.variants),
    },
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
  };
  const formatVanillaExtractStyleBases = (): string =>
    libraryMap.vanillaExtractStyleBases
      .map(
        ({ component, propsType, styleType, source }) =>
          `- \`${component}\` : \`${propsType}\` inclut \`${styleType}\` depuis \`${source}\``,
      )
      .join('\n') || '- Aucune';
  const formatImplementationLeaks = (): string =>
    libraryMap.implementationLeaks
      .map(
        ({ component, prop, reason }) =>
          `- \`${component}.${prop}\` : ${reason}`,
      )
      .join('\n') || '- Aucune';
  const formatArchitecturalSignals = (): string =>
    libraryMap.architecturalSignals
      .map(({ kind, values, confidence }) => {
        const label =
          kind === 'variant-similarity'
            ? 'Variantes similaires'
            : 'Props similaires';
        return `- ${label} : \`${values[0]}\` et \`${values[1]}\` (confiance : ${Math.round(confidence * 100)} %)`;
      })
      .join('\n') || '- Aucun';

  const summary = `# Design system dataset

Generated at ${new Date().toISOString()}.

## Composants

- Publics : ${libraryMap.componentGroups.public.length}
- Internes : ${libraryMap.componentGroups.internal.length}
- Racines : ${outputComponents.filter((component) => component.componentKind === 'root').length}
- Composés : ${outputComponents.filter((component) => component.componentKind === 'compound').length}

## Index de faits

- Props personnalisées : ${Object.keys(libraryMap.indexes.props).length}
- Variantes : ${Object.keys(libraryMap.indexes.variants).length}

## Encapsulation d'API

- Fuites d'implémentation signalées : ${libraryMap.implementationLeaks.length}
- Bases de props couplées à des styles Vanilla Extract : ${libraryMap.vanillaExtractStyleBases.length}
- Signaux architecturaux : ${libraryMap.architecturalSignals.length}

### Fuites d'implémentation

Types techniques exposés dans des props publiques :

${formatImplementationLeaks()}

### Bases Vanilla Extract exposées aux consommateurs

${formatVanillaExtractStyleBases()}

### Signaux architecturaux

Ces rapprochements suggèrent des noms à harmoniser ; ils ne constituent pas des erreurs.

${formatArchitecturalSignals()}

`;

  await mkdir(outputRoot, { recursive: true });
  await writeFile(
    path.join(outputRoot, 'library-map.json'),
    `${JSON.stringify(libraryMap, null, 2)}\n`,
    'utf8',
  );
  await writeFile(path.join(outputRoot, 'audit-summary.md'), summary, 'utf8');

  const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  const { stdout: projectTree } = await execFileAsync(
    pnpmCommand,
    [
      '--package=tree-node-cli',
      'dlx',
      'tree',
      'src',
      '-I',
      '"dist|coverage|node_modules"',
    ],
    {
      cwd: root,
      maxBuffer: 20 * 1024 * 1024,
      shell: true,
    },
  );
  await writeFile(
    path.join(outputRoot, 'project-tree.txt'),
    projectTree,
    'utf8',
  );

  console.log(`Audited ${components.length} components.`);
}
