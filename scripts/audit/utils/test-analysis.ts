import { readdir } from 'node:fs/promises';
import path from 'node:path';

import type { ComponentInfo, ConsistencyFinding } from '../types/index.ts';

function repositoryPath(root: string, filePath: string): string {
  return path.relative(root, filePath).split(path.sep).join('/');
}

export async function analyzeComponentTests(
  root: string,
  components: ComponentInfo[],
): Promise<ConsistencyFinding[]> {
  const testRoot = path.join(root, 'tests');
  const testFiles = await readdir(testRoot, { recursive: true });
  const testNames = new Set(
    testFiles
      .filter((file) => /\.(test|spec)\.tsx?$/.test(file))
      .map((file) => path.basename(file)),
  );

  return components
    .filter((component) => component.scope === 'public')
    .filter(
      (component) =>
        !testNames.has(`${component.name}.test.tsx`) &&
        !testNames.has(`${component.name}.test.ts`) &&
        !testNames.has(`${component.name}.spec.tsx`) &&
        !testNames.has(`${component.name}.spec.ts`),
    )
    .map((component) => ({
      rule: 'missing-unit-test',
      severity: 'warning' as const,
      category: 'testing' as const,
      component: component.name,
      file: repositoryPath(root, component.sourcePath),
      line: 1,
      message: `Le composant public \`${component.name}\` ne possède pas de test unitaire détecté.`,
      evidence: `Aucun fichier \`tests/**/${component.name}.test.tsx\`, \`.test.ts\`, \`.spec.tsx\` ou \`.spec.ts\` n’a été trouvé.`,
      remediation: `Ajouter un test unitaire dans \`tests/components/**/${component.name}.test.tsx\` couvrant le rendu, les props publiques et les comportements observables.`,
    }));
}
