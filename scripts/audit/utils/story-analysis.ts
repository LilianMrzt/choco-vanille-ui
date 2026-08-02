import path from 'node:path';
import { Node, SyntaxKind, type SourceFile } from 'ts-morph';

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

function hasAccessibilityTable(source: string): boolean {
  return (
    source.includes('Accessibility') &&
    /\|\s*Prop\s*\/\s*Attribute\s*\|\s*Required\s*\|\s*Type\s*\|\s*Notes\s*\|/.test(
      source,
    )
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
