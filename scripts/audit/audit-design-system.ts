import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';
import { buildSourceGraph } from './utils/source-graph.ts';
import { analyzeComponents } from './utils/component-analysis.ts';
import { detectArchitecture } from './utils/architecture.ts';
import { detectConsistency } from './utils/consistency.ts';
import { generateOutputs } from './utils/output.ts';
import { analyzeComponentStories } from './utils/story-analysis.ts';

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
  const storyAudit = analyzeComponentStories(root, graph.sourceFiles);
  await generateOutputs({
    components,
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    consistencyFindings,
    storyFindings: storyAudit.findings,
    storyCount: storyAudit.storyCount,
    outputRoot,
    root,
  });

  const componentErrorCount = consistencyFindings.filter(
    (finding) => finding.severity === 'error',
  ).length;
  const warningCount = consistencyFindings.length - componentErrorCount;
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
  for (const finding of storyAudit.findings) {
    console.log(
      `${finding.severity.toUpperCase()} [${finding.rule}] ${finding.file}:${finding.line} — ${finding.message}`,
    );
  }
  const errorCount = componentErrorCount + storyAudit.findings.length;
  console.log(
    `Coherence findings: ${componentErrorCount} component error(s), ${warningCount} warning(s), ${storyAudit.findings.length} story error(s), ${architecturalSignals.length} signal(s).`,
  );

  if (strict && errorCount > 0) {
    process.exitCode = 1;
  }
}

await main();
