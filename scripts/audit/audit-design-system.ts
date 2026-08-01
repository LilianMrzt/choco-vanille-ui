import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildSourceGraph } from './utils/source-graph.ts';
import { analyzeComponents } from './utils/component-analysis.ts';
import { detectArchitecture } from './utils/architecture.ts';
import { generateOutputs } from './utils/output.ts';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);
const componentsRoot = path.join(root, 'src', 'components');
const outputRoot = path.join(root, 'docs', 'project');

async function main(): Promise<void> {
  const graph = buildSourceGraph(root, componentsRoot);
  const components = analyzeComponents({ ...graph, componentsRoot });
  const {
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
  } = detectArchitecture(components);
  await generateOutputs({
    components,
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    outputRoot,
    root,
  });
}

await main();
