import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';
import { buildSourceGraph } from './utils/source-graph.ts';
import { analyzeComponents } from './utils/component-analysis.ts';
import { detectArchitecture } from './utils/architecture.ts';
import { detectConsistency } from './utils/consistency.ts';
import { generateOutputs } from './utils/output.ts';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);
const componentsRoot = path.join(root, 'src', 'components');
const outputRoot = path.join(root, 'docs', 'audit');

async function main(): Promise<void> {
  const strict = process.argv.slice(2).includes('--strict');
  const graph = buildSourceGraph(root, componentsRoot);
  const components = analyzeComponents({ ...graph, componentsRoot });
  const {
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
  } = detectArchitecture(components);
  const consistencyFindings = detectConsistency({
    root,
    components,
    sourceFiles: graph.sourceFiles,
    publicExports: graph.publicExports,
  });
  await generateOutputs({
    components,
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    consistencyFindings,
    outputRoot,
    root,
  });

  const errorCount = consistencyFindings.filter(
    (finding) => finding.severity === 'error',
  ).length;
  const warningCount = consistencyFindings.length - errorCount;
  for (const finding of consistencyFindings) {
    const owner = finding.component ? ` ${finding.component}` : '';
    console.log(
      `${finding.severity.toUpperCase()} [${finding.rule}]${owner} ${finding.file}:${finding.line} — ${finding.message}`,
    );
  }
  for (const signal of architecturalSignals) {
    console.log(
      `SIGNAL [${signal.kind}] ${signal.values.join(' / ')} — confiance ${Math.round(signal.confidence * 100)} %`,
    );
  }
  console.log(
    `Coherence findings: ${errorCount} error(s), ${warningCount} warning(s), ${architecturalSignals.length} signal(s).`,
  );

  if (strict && errorCount > 0) {
    process.exitCode = 1;
  }
}

await main();
