import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import type {
  ArchitecturalSignal,
  ComponentInfo,
  ConsistencyFinding,
  ImplementationLeak,
  VanillaExtractStyleBase,
} from '../types/index.ts';
import type { StoryFinding } from './story-analysis.ts';
import {
  buildComponentGroups,
  buildPropsIndex,
  buildValueIndex,
  componentKind,
} from './architecture.ts';
import { consistencyCoverage } from './consistency.ts';

const execFileAsync = promisify(execFile);

type GenerateOutputsParams = {
  components: ComponentInfo[];
  implementationLeaks: ImplementationLeak[];
  vanillaExtractStyleBases: (VanillaExtractStyleBase & {
    component: string;
  })[];
  architecturalSignals: ArchitecturalSignal[];
  consistencyFindings: ConsistencyFinding[];
  storyFindings: StoryFinding[];
  storyCount: number;
  outputRoot: string;
  root: string;
};

type FindingGuidance = {
  title: string;
  consumerSurface: string;
  impact: string;
  targetApi: string;
};

function guidanceForFinding(finding: ConsistencyFinding): FindingGuidance {
  switch (finding.rule) {
    case 'public-broad-index-signature':
      return {
        title: 'Props publiques trop permissives',
        consumerSurface: 'TypeScript public',
        impact:
          'Le consommateur peut passer une prop inconnue ou mal orthographiée sans erreur TypeScript. L’autocomplétion ne décrit donc plus précisément le composant.',
        targetApi:
          'Le type de props étend uniquement les attributs du véritable élément HTML ou de la primitive Base UI, sans `[key: string]: unknown`.',
      };
    case 'public-vanilla-extract-type':
      return {
        title: 'Type public couplé à Vanilla Extract',
        consumerSurface: 'Props et types publics',
        impact:
          'Un détail de génération CSS devient une dépendance de la Consumer API. Une modification interne de recette peut alors casser les types publics.',
        targetApi:
          'Les unions `ComponentVariant`, `ComponentSize` et `ComponentColor` vivent dans `types/` ou `constants/`. La recette les consomme, mais aucun type public n’importe un fichier `*.css.ts`.',
      };
    case 'public-any':
      return {
        title: 'Type public non sécurisé avec `any`',
        consumerSurface: 'TypeScript public',
        impact:
          'Le consommateur perd la vérification TypeScript et l’autocomplétion sur cette partie de l’API.',
        targetApi:
          'Remplacer `any` par le type générique, le type de primitive ou l’union exacte correspondant au comportement runtime.',
      };
    case 'noncanonical-common-prop':
      return {
        title: 'Nom de prop non canonique',
        consumerSurface: 'Nommage des props',
        impact:
          'Un même concept doit être mémorisé sous plusieurs noms selon le composant.',
        targetApi:
          'Utiliser le nom canonique indiqué par la matrice et supprimer l’alias divergent.',
      };
    case 'fabricated-event-details':
      return {
        title: 'Callback avec détails d’événement fabriqués',
        consumerSurface: 'Callbacks',
        impact:
          'Le callback semble compatible avec la primitive mais fournit au consommateur un objet différent ou incomplet.',
        targetApi:
          'Transmettre tous les arguments du callback Base UI sans les remplacer. Un Field simplifié peut exposer uniquement la valeur si son type le déclare explicitement.',
      };
    case 'incomplete-controlled-triplet':
      return {
        title: 'API controlled/uncontrolled incomplète',
        consumerSurface: 'Gestion d’état',
        impact:
          'Le consommateur peut contrôler l’état mais ne peut pas choisir proprement une valeur initiale non contrôlée.',
        targetApi:
          'Exposer le triplet complet `value/defaultValue/onValueChange`, `open/defaultOpen/onOpenChange`, `checked/defaultChecked/onCheckedChange` ou `pressed/defaultPressed/onPressedChange`.',
      };
    case 'controlled-prop-used-as-default':
      return {
        title: 'État interne initialisé depuis la valeur contrôlée',
        consumerSurface: 'Gestion d’état',
        impact:
          'Le composant mélange les modes controlled et uncontrolled et peut conserver une valeur interne obsolète.',
        targetApi:
          'Initialiser l’état interne uniquement depuis `default*`; la prop contrôlée gagne lorsqu’elle est différente de `undefined`.',
      };
    case 'inaccessible-optional-label':
      return {
        title: 'Nom accessible non garanti par les props',
        consumerSurface: 'Accessibilité observable',
        impact:
          'Le consommateur peut créer un contrôle interactif sans texte ni nom accessible tout en respectant les types.',
        targetApi:
          'Exiger `label` pour le mode texte, ou une union de props imposant `aria-label` au mode icône-seule.',
      };
    case 'unnamed-progressbar':
      return {
        title: 'Progressbar sans nom accessible garanti',
        consumerSurface: 'Accessibilité observable',
        impact:
          'Une technologie d’assistance peut annoncer une barre de progression sans indiquer ce qu’elle mesure.',
        targetApi:
          'Exiger exactement une source de nom exploitable : `label`, `aria-label` ou `aria-labelledby`, puis la transmettre au nœud `progressbar`.',
      };
    case 'separator-orientation':
      return {
        title: 'Orientation visuelle et ARIA désynchronisées',
        consumerSurface: 'Accessibilité observable',
        impact:
          'Le séparateur peut être vertical visuellement mais rester horizontal pour les technologies d’assistance.',
        targetApi:
          'La prop publique `orientation` pilote à la fois la recette visuelle et `aria-orientation`.',
      };
    case 'role-none-sentinel':
      return {
        title: 'Valeur sentinelle `role="none"` rendue littéralement',
        consumerSurface: 'Accessibilité observable',
        impact:
          'La valeur publique censée désactiver la live region produit un rôle DOM différent du contrat annoncé.',
        targetApi:
          'Lorsque la prop vaut `none`, ne rendre aucun attribut `role`; transmettre les autres valeurs inchangées.',
      };
    case 'missing-compound-slot-props-export':
      return {
        title: 'Type de props d’un slot compound non exporté',
        consumerSurface: 'Composition et exports',
        impact:
          'Le slot est utilisable dans le namespace composé, mais son type n’est pas importable pour construire des wrappers.',
        targetApi:
          'Conserver la valeur sous `Component.Slot` et exporter `ComponentSlotProps` à plat depuis le barrel du composant.',
      };
    case 'duplicate-flat-compound-slot-export':
      return {
        title: 'Slot compound exporté par deux chemins',
        consumerSurface: 'Composition et exports',
        impact:
          'Le consommateur rencontre deux conventions concurrentes pour accéder à la même valeur.',
        targetApi:
          'Exporter la valeur uniquement sous `Component.Slot`; garder seulement son type de props à plat.',
      };
    case 'theme-barrel-not-public':
      return {
        title: 'API de thème absente de l’entrée du package',
        consumerSurface: 'Exports publics',
        impact:
          'Des symboles déclarés publics par le thème restent inaccessibles depuis le point d’entrée de la librairie.',
        targetApi:
          'Tous les symboles du barrel public `src/theme/index.ts` sont réexportés par `src/index.ts`.',
      };
    case 'partial-theme-self-reference':
      return {
        title: 'Override de thème produisant une auto-référence CSS',
        consumerSurface: 'Thème public',
        impact:
          'Un override partiel peut générer une variable CSS qui se référence elle-même et perdre sa valeur effective.',
        targetApi:
          'N’émettre que les tokens réellement fournis par le consommateur et laisser la cascade conserver les autres valeurs.',
      };
    case 'undocumented-public-default':
      return {
        title: 'Valeur par défaut publique non documentée',
        consumerSurface: 'Props visuelles',
        impact:
          'Le consommateur doit lire l’implémentation pour connaître le rendu obtenu lorsqu’il omet la prop.',
        targetApi:
          'Documenter la valeur par défaut directement sur la prop publique avec une JSDoc explicite.',
      };
    default:
      if (
        finding.rule.startsWith('visual-') &&
        finding.rule.endsWith('-vocabulary')
      ) {
        return {
          title: 'Vocabulaire visuel différent de la matrice',
          consumerSurface: 'Variants, tailles ou couleurs',
          impact:
            'Le consommateur doit mémoriser un vocabulaire différent pour un axe déjà standardisé dans la même famille.',
          targetApi:
            'Remplacer les valeurs publiques divergentes par le vocabulaire attendu dans la preuve, sans modifier le rendu associé.',
        };
      }
      if (finding.rule.startsWith('visual-')) {
        return {
          title: 'Contrat visuel différent de la matrice',
          consumerSurface: 'Variants, tailles ou couleurs',
          impact:
            'Le comportement par défaut ou l’échelle publique diffère du contrat officiel de la famille.',
          targetApi:
            'Aligner la surface publique et le runtime sur la valeur attendue dans la preuve.',
        };
      }
      return {
        title: 'Incohérence de surface publique',
        consumerSurface: finding.category,
        impact:
          'La surface observable diffère de la convention encodée dans la matrice.',
        targetApi: finding.remediation,
      };
  }
}

export async function generateOutputs(
  params: GenerateOutputsParams,
): Promise<void> {
  const {
    components,
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    consistencyFindings,
    storyFindings,
    storyCount,
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

  const generatedAt = new Date().toISOString();
  const libraryMap = {
    schemaVersion: 6,
    generatedAt,
    componentGroups: buildComponentGroups(components),
    components: outputComponents,
    indexes: {
      props: buildPropsIndex(components),
      variants: buildValueIndex(components, (component) => component.variants),
    },
    implementationLeaks,
    vanillaExtractStyleBases,
    architecturalSignals,
    consistencyFindings,
    storyAudit: {
      storyCount,
      findings: storyFindings,
    },
    matrixCoverage: consistencyCoverage,
  };
  const consistencyErrors = consistencyFindings.filter(
    (finding) => finding.severity === 'error',
  );
  const consistencyWarnings = consistencyFindings.filter(
    (finding) => finding.severity === 'warning',
  );
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
  const formatConsistencyFindings = (findings: ConsistencyFinding[]): string =>
    findings
      .map((finding) => {
        const guidance = guidanceForFinding(finding);
        return `### ${guidance.title} — ${finding.component ?? finding.symbol ?? 'Bibliothèque'}

- Identifiant machine : \`${finding.rule}\`
- Catégorie : \`${finding.category}\`
- Source : \`${finding.file}:${finding.line}\`
- Problème : ${finding.message}
- Preuve : ${finding.evidence}
- Impact Consumer API : ${guidance.impact}
- API cible : ${guidance.targetApi}
- Correction : ${finding.remediation}`;
      })
      .join('\n\n') || '- Aucun';
  const formatCoverageList = (items: readonly string[]): string =>
    items.map((item) => `- ${item}`).join('\n');
  const formatConsumerApiCoverage =
    (): string => `| Surface | Règles | Ce qui est détecté |
| --- | --- | --- |
${consistencyCoverage.consumerApi
  .map(
    ({ surface, rules, detects }) =>
      `| ${surface} | \`${rules}\` | ${detects} |`,
  )
  .join('\n')}`;

  const summary = `# Design system dataset

Generated at ${generatedAt}.

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

## Problèmes de cohérence

- Erreurs : ${consistencyErrors.length}
- Avertissements : ${consistencyWarnings.length}
- Rapports détaillés : [composants nécessitant une intervention](./components/index.md)
- Stories non conformes : ${storyFindings.length} erreur(s) — [rapports détaillés](./stories/index.md)
- Couverture : [règles automatisées et limites](./matrix-coverage.md)

### Couverture de la matrice

Automatisé :

${formatCoverageList(consistencyCoverage.automated)}

Couverture Consumer API exacte :

${formatConsumerApiCoverage()}

Limites nécessitant une validation humaine :

${formatCoverageList(consistencyCoverage.manualLimitations)}

### Erreurs

${formatConsistencyFindings(consistencyErrors)}

### Avertissements

${formatConsistencyFindings(consistencyWarnings)}

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
  await writeFile(
    path.join(outputRoot, 'audit-findings.json'),
    `${JSON.stringify(
      {
        schemaVersion: 2,
        generatedAt,
        summary: {
          errors: consistencyErrors.length,
          warnings: consistencyWarnings.length,
          storyErrors: storyFindings.length,
          signals: architecturalSignals.length,
        },
        findings: consistencyFindings,
        storyFindings,
        signals: architecturalSignals,
        coverage: consistencyCoverage,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  const componentOutputRoot = path.join(outputRoot, 'components');
  await rm(componentOutputRoot, { recursive: true, force: true });
  await mkdir(componentOutputRoot, { recursive: true });

  const slugFor = (name: string): string =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  const markdownValue = (value: string): string =>
    value.replaceAll('|', '\\|').replaceAll('\n', ' ');
  const listOrNone = (values: string[]): string =>
    values.length > 0 ? values.map((value) => `\`${value}\``).join(', ') : '—';
  const componentIndexEntries: string[] = [];
  const componentByName = new Map(
    outputComponents.map((component) => [component.name, component]),
  );
  const reportOwner = (
    componentName: string,
  ): (typeof outputComponents)[number] | undefined => {
    let current = componentByName.get(componentName);
    const visited = new Set<string>();

    while (current && current.parentComponents.length > 0) {
      if (visited.has(current.name)) return undefined;
      visited.add(current.name);
      current = current.parentComponents
        .map((parent) => componentByName.get(parent))
        .find((parent) => parent !== undefined);
    }

    return current?.scope === 'public' ? current : undefined;
  };
  const findingsByOwner = new Map<string, ConsistencyFinding[]>();

  for (const finding of consistencyFindings) {
    if (!finding.component) continue;
    const owner = reportOwner(finding.component);
    if (!owner) continue;
    const ownerFindings = findingsByOwner.get(owner.name) ?? [];
    ownerFindings.push(finding);
    findingsByOwner.set(owner.name, ownerFindings);
  }

  for (const component of outputComponents.filter((candidate) =>
    findingsByOwner.has(candidate.name),
  )) {
    const slug = slugFor(component.name);
    const componentFindings = findingsByOwner.get(component.name) ?? [];
    const componentErrors = componentFindings.filter(
      (finding) => finding.severity === 'error',
    );
    const componentWarnings = componentFindings.filter(
      (finding) => finding.severity === 'warning',
    );
    const decision =
      componentErrors.length > 0 ? 'Corriger' : 'Vérifier / Standardiser';
    const involvedComponents = [
      ...new Set(
        componentFindings.map((finding) => finding.component ?? component.name),
      ),
    ];
    const vanillaExtractFindings = componentFindings.filter(
      (finding) => finding.rule === 'public-vanilla-extract-type',
    );
    const familyImplementationLeaks = implementationLeaks.filter(
      (leak) => reportOwner(leak.component)?.name === component.name,
    );
    const propsTable =
      component.props.length > 0
        ? `| Prop | Type |
| --- | --- |
${component.props
  .map(
    (prop) =>
      `| \`${markdownValue(prop.name)}\` | \`${markdownValue(prop.type)}\` |`,
  )
  .join('\n')}`
        : 'Aucune prop personnalisée recensée.';
    const findingsMarkdown =
      componentFindings.length > 0
        ? componentFindings
            .map((finding, index) => {
              const guidance = guidanceForFinding(finding);
              const target = finding.component ?? component.name;
              return `## ${index + 1}. ${target} — ${guidance.title}

### Observations

- Élément concerné : \`${target}\`
- Identifiant machine : \`${finding.rule}\`
- Domaine Consumer API : **${guidance.consumerSurface}**
- Sévérité : **${finding.severity}**
- Source : \`${finding.file}:${finding.line}\`
- Preuve : ${finding.evidence}

### Conclusions

${finding.message}

### Impact Consumer API

${guidance.impact}

### Décision

**DECISION = ${finding.severity === 'error' ? 'Corriger' : 'Vérifier / Standardiser'}.**

### API cible

${guidance.targetApi}

### Tâches d'implémentation

1. ${finding.remediation}
2. Conserver les comportements et props sans rapport avec ce constat.
3. Réexécuter \`pnpm audit:design-system\`.

### Critère de réussite

Le constat \`${finding.rule}\` ne doit plus apparaître pour \`${target}\` dans ce fichier régénéré.
`;
            })
            .join('\n')
        : '';
    const vanillaExtractSection =
      vanillaExtractFindings.length > 0
        ? `## Action transversale obligatoire — supprimer Vanilla Extract de l’API publique

La librairie doit être autosuffisante : un consommateur ne doit jamais dépendre d’un type généré par Vanilla Extract ni d’un fichier \`*.css.ts\`.

| Élément | Fichier public à corriger | Type technique exposé | Import interdit |
| --- | --- | --- | --- |
${vanillaExtractFindings
  .map(
    (finding) =>
      `| \`${finding.component ?? component.name}\` | \`${finding.file}\` | \`${markdownValue(finding.symbol ?? 'type de recette')}\` | ${markdownValue(finding.evidence)} |`,
  )
  .join('\n')}

### Structure cible commune

1. Déclarer les unions publiques stables dans \`types/Component.types.ts\` ou dans \`constants/\`.
2. Faire importer ces unions ou constantes par la recette Vanilla Extract.
3. Faire importer les props publiques uniquement depuis \`types/\` ou \`constants/\`.
4. Supprimer tout import public vers \`styles/*.css.ts\` et tout \`RecipeVariants\` public.

`
        : '';
    const implementationLeaksSection =
      familyImplementationLeaks.length > 0
        ? `## Autres détails d’implémentation exposés

${familyImplementationLeaks
  .map(
    ({ component: leakComponent, prop, reason }) =>
      `- \`${leakComponent}.${prop}\` : ${reason}`,
  )
  .join('\n')}

`
        : '';

    const componentReport = `# ${component.name}

Généré automatiquement le ${generatedAt}.

## Synthèse

- Catégorie : \`${component.category}\`
- Type : \`${component.componentKind}\`
- Erreurs : ${componentErrors.length}
- Avertissements : ${componentWarnings.length}
- Décision globale : **${decision}**
- Éléments concernés : ${listOrNone(involvedComponents)}

## Instructions pour l’agent correcteur

1. Traiter chaque constat de ce fichier, dans l’ordre.
2. Appliquer exactement l’API cible indiquée.
3. Ne pas élargir le refactoring aux éléments sans constat.
4. Régénérer l’audit après les modifications.
5. Le travail est terminé lorsque les constats de ce fichier ont disparu sans nouveau constat.

## Surface publique observée

- Variants : ${listOrNone(component.variants)}
- Statuts : ${listOrNone(component.statuses)}
- Tones : ${listOrNone(component.tones)}
- Exports : ${listOrNone(component.exports)}
- Sous-composants : ${listOrNone(component.subComponents)}
- Parents : ${listOrNone(component.parentComponents)}

### Props personnalisées

${propsTable}

## Encapsulation

- Imports Vanilla Extract interdits dans l’API publique : ${vanillaExtractFindings.length}
- Autres détails d’implémentation exposés : ${familyImplementationLeaks.length}

${vanillaExtractSection}${implementationLeaksSection}## Corrections à appliquer

${findingsMarkdown}`;

    await writeFile(
      path.join(componentOutputRoot, `${slug}.md`),
      componentReport,
      'utf8',
    );
    componentIndexEntries.push(
      `- [${component.name}](./${slug}.md) — ${componentErrors.length} erreur(s), ${componentWarnings.length} avertissement(s) — **${decision}**`,
    );
  }

  await writeFile(
    path.join(componentOutputRoot, 'index.md'),
    `# Composants nécessitant une intervention

Générés automatiquement le ${generatedAt}.

Un seul fichier est créé par composant public exporté. Les constats de ses sous-composants compound sont regroupés dans ce fichier.

${componentIndexEntries.join('\n')}
`,
    'utf8',
  );

  const storyOutputRoot = path.join(outputRoot, 'stories');
  await rm(storyOutputRoot, { recursive: true, force: true });
  await mkdir(storyOutputRoot, { recursive: true });
  const storyFindingsByFile = new Map<string, StoryFinding[]>();
  for (const finding of storyFindings) {
    const findings = storyFindingsByFile.get(finding.file) ?? [];
    findings.push(finding);
    storyFindingsByFile.set(finding.file, findings);
  }
  const storyIndexEntries: string[] = [];

  for (const [file, findings] of [...storyFindingsByFile.entries()].sort(
    ([left], [right]) => left.localeCompare(right),
  )) {
    const componentName = path
      .basename(file)
      .replace(/\.stories\.tsx$/, '');
    const findingsMarkdown = findings
      .map(
        (finding, index) => `## ${index + 1}. ${finding.rule}

### Observation

- Sévérité : **${finding.severity}**
- Source : \`${finding.file}:${finding.line}\`
- Problème : ${finding.message}

### Correction attendue

${finding.remediation}

### Critère de réussite

La règle \`${finding.rule}\` ne doit plus apparaître pour \`${finding.file}\` après régénération de l’audit.`,
      )
      .join('\n\n');
    await writeFile(
      path.join(storyOutputRoot, `${componentName}.md`),
      `# ${componentName}

Généré automatiquement le ${generatedAt}.

## Synthèse

- Source : \`${file}\`
- Erreurs : ${findings.length}
- Décision globale : **Corriger**

## Instructions pour l’agent correcteur

1. Traiter chaque constat de ce fichier, dans l’ordre.
2. Conserver le contrat et les exemples qui ne sont pas concernés.
3. Régénérer \`pnpm audit:design-system\`.
4. Le travail est terminé lorsque ce fichier n’est plus généré.

${findingsMarkdown}
`,
      'utf8',
    );
    storyIndexEntries.push(
      `- [${componentName}](./${componentName}.md) — ${findings.length} erreur(s) — **Corriger**`,
    );
  }

  await writeFile(
    path.join(storyOutputRoot, 'index.md'),
    `# Stories nécessitant une intervention

Généré automatiquement le ${generatedAt}.

Une story de composant en erreur possède un rapport dédié. Les fichiers MDX et
\`src/stories/overview/**\` restent exclus du périmètre.

${storyIndexEntries.join('\n') || '- Aucune story en erreur.'}
`,
    'utf8',
  );
  await rm(path.join(outputRoot, 'stories.md'), { force: true });

  await writeFile(
    path.join(outputRoot, 'matrix-coverage.md'),
    `# Couverture automatisée de la matrice

## Contrôles automatisés

${formatCoverageList(consistencyCoverage.automated)}

## Cohérence de la Consumer API

Le tableau suivant décrit précisément les incohérences statiquement recherchées. Le script ne prétend pas découvrir une convention sémantique qui n’est pas encodée dans la matrice.

${formatConsumerApiCoverage()}

## Limites explicites

${formatCoverageList(consistencyCoverage.manualLimitations)}
`,
    'utf8',
  );

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

  console.log(
    `Audited ${components.length} components and wrote ${consistencyFindings.length} coherence finding(s).`,
  );
}
