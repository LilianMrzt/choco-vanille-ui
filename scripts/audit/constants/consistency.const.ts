export type VocabularySource =
  | {
      kind: 'const';
      file: string;
      symbol: string;
    }
  | {
      kind: 'type';
      file: string;
      symbol: string;
    }
  | {
      kind: 'recipe';
      file: string;
      axis: string;
    };

export type VisualVocabularyContract = {
  component: string;
  axis: 'color' | 'size' | 'variant';
  source: VocabularySource;
  expected: readonly string[];
  defaultValue?: string;
  defaultSource?: string;
  documentationComponent?: string;
};

const ACTION_VARIANTS = ['contained', 'outlined', 'ghost'] as const;
const TOGGLE_VARIANTS = ['outlined', 'ghost'] as const;
const SEMANTIC_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'destructive',
  'success',
  'warning',
  'info',
] as const;
const EXTENDED_COLORS = [
  ...SEMANTIC_COLORS,
  'purple',
  'pink',
  'orange',
  'teal',
  'cyan',
  'indigo',
] as const;
const TEXT_CONTROL_SIZES = ['sm', 'md', 'lg'] as const;
const ICON_CONTROL_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

export const visualVocabularyContracts: VisualVocabularyContract[] = [
  {
    component: 'Button',
    axis: 'variant',
    source: {
      kind: 'const',
      file: 'src/components/actions/_shared/buttons/constants/buttonVariants.const.ts',
      symbol: 'BUTTON_VARIANTS',
    },
    expected: ACTION_VARIANTS,
  },
  {
    component: 'IconButton',
    axis: 'variant',
    source: {
      kind: 'const',
      file: 'src/components/actions/_shared/buttons/constants/buttonVariants.const.ts',
      symbol: 'BUTTON_VARIANTS',
    },
    expected: ACTION_VARIANTS,
  },
  {
    component: 'Toggle',
    axis: 'variant',
    source: {
      kind: 'recipe',
      file: 'src/components/actions/toggle/styles/Toggle.css.ts',
      axis: 'variant',
    },
    expected: TOGGLE_VARIANTS,
  },
  {
    component: 'Badge',
    axis: 'variant',
    source: {
      kind: 'const',
      file: 'src/components/data-display/badge/constants/index.ts',
      symbol: 'BADGE_VARIANTS',
    },
    expected: ['contained', 'subtle', 'outlined', 'outlinedSubtle'],
  },
  {
    component: 'Callout',
    axis: 'variant',
    source: {
      kind: 'type',
      file: 'src/components/feedback/callout/types/Callout.types.ts',
      symbol: 'CalloutVariant',
    },
    expected: ['info', 'success', 'warning', 'error'],
  },
  {
    component: 'Toast',
    axis: 'variant',
    source: {
      kind: 'recipe',
      file: 'src/components/feedback/toast/styles/Toast.css.ts',
      axis: 'variant',
    },
    expected: ['info', 'success', 'warning', 'error'],
  },
  {
    component: 'Skeleton',
    axis: 'variant',
    source: {
      kind: 'recipe',
      file: 'src/components/feedback/skeleton/styles/Skeleton.css.ts',
      axis: 'variant',
    },
    expected: ['circular', 'rectangular', 'rounded'],
  },
  {
    component: 'TabsList',
    axis: 'variant',
    source: {
      kind: 'type',
      file: 'src/components/navigation/tabs/context/TabsVariant.context.ts',
      symbol: 'TabsVariant',
    },
    expected: ['default', 'pills'],
  },
  {
    component: 'Button',
    axis: 'size',
    source: {
      kind: 'const',
      file: 'src/components/actions/_shared/buttons/constants/buttonSizes.const.ts',
      symbol: 'BUTTON_SIZES',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource:
      'src/components/actions/_shared/buttons/styles/buttonShared.css.ts',
  },
  {
    component: 'Toggle',
    axis: 'size',
    source: {
      kind: 'const',
      file: 'src/components/actions/_shared/buttons/constants/buttonSizes.const.ts',
      symbol: 'BUTTON_SIZES',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource:
      'src/components/actions/toggle/styles/Toggle.css.ts',
  },
  {
    component: 'TextField',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/forms/text-field/types/TextField.types.ts',
      symbol: 'TextFieldSize',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource: 'src/components/forms/text-field/TextField.tsx',
  },
  {
    component: 'TextArea',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/forms/text-area/types/TextArea.types.ts',
      symbol: 'TextAreaSize',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource: 'src/components/forms/text-area/TextArea.tsx',
  },
  {
    component: 'SelectTrigger',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/forms/text-field/types/TextField.types.ts',
      symbol: 'TextFieldSize',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource:
      'src/components/forms/select/components/select-trigger/SelectTrigger.tsx',
  },
  {
    component: 'Switch',
    axis: 'size',
    source: {
      kind: 'recipe',
      file: 'src/components/forms/switch/styles/Switch.css.ts',
      axis: 'size',
    },
    expected: TEXT_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource: 'src/components/forms/switch/Switch.tsx',
  },
  {
    component: 'IconButton',
    axis: 'size',
    source: {
      kind: 'const',
      file: 'src/components/actions/icon-button/constants/iconButtonSizes.const.ts',
      symbol: 'ICON_BUTTON_SIZES',
    },
    expected: ICON_CONTROL_SIZES,
    defaultValue: 'md',
    defaultSource: 'src/components/actions/icon-button/IconButton.tsx',
  },
  {
    component: 'Avatar',
    axis: 'size',
    source: {
      kind: 'const',
      file: 'src/components/data-display/avatar/constants/index.ts',
      symbol: 'AVATAR_SIZES',
    },
    expected: ['sm', 'md', 'lg', 'xl'],
    defaultValue: 'md',
    defaultSource: 'src/components/data-display/avatar/Avatar.tsx',
  },
  {
    component: 'Progress',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/feedback/progress/types/Progress.types.ts',
      symbol: 'ProgressSize',
    },
    expected: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'sm',
    defaultSource: 'src/components/feedback/progress/Progress.tsx',
  },
  {
    component: 'CircularProgress',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/feedback/progress/types/Progress.types.ts',
      symbol: 'ProgressSize',
    },
    expected: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'sm',
    defaultSource: 'src/components/feedback/progress/CircularProgress.tsx',
    documentationComponent: 'Progress',
  },
  {
    component: 'Drawer',
    axis: 'size',
    source: {
      kind: 'const',
      file: 'src/components/overlay/drawer/constants/drawerSizes.const.ts',
      symbol: 'DRAWER_SIZES',
    },
    expected: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    defaultValue: 'md',
    defaultSource: 'src/components/overlay/drawer/Drawer.tsx',
  },
  {
    component: 'Icon',
    axis: 'size',
    source: {
      kind: 'recipe',
      file: 'src/components/foundation/icon/styles/Icon.css.ts',
      axis: 'size',
    },
    expected: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    defaultValue: 'md',
    defaultSource: 'src/components/foundation/icon/styles/Icon.css.ts',
  },
  {
    component: 'Typography',
    axis: 'size',
    source: {
      kind: 'type',
      file: 'src/components/foundation/typography/types/Typography.types.ts',
      symbol: 'TypographySize',
    },
    expected: [
      '10',
      '12',
      '14',
      '16',
      '18',
      '20',
      '24',
      '30',
      '36',
      '48',
      '60',
      '72',
    ],
  },
  ...['Button', 'IconButton', 'Toggle'].map(
    (component): VisualVocabularyContract => ({
      component,
      axis: 'color',
      source: {
        kind: 'const',
        file: 'src/components/actions/_shared/buttons/constants/buttonColors.const.ts',
        symbol: 'BUTTON_COLORS',
      },
      expected: SEMANTIC_COLORS,
    }),
  ),
  ...['Badge', 'Avatar', 'Progress', 'CircularProgress'].map(
    (component): VisualVocabularyContract => ({
      component,
      axis: 'color',
      source: {
        kind: 'const',
        file:
          component === 'Avatar'
            ? 'src/components/data-display/avatar/constants/index.ts'
            : component === 'Badge'
              ? 'src/components/data-display/badge/constants/index.ts'
              : 'src/components/feedback/progress/constants/progressColors.const.ts',
        symbol:
          component === 'Avatar'
            ? 'AVATAR_COLORS'
            : component === 'Badge'
              ? 'BADGE_COLORS'
              : 'PROGRESS_COLORS',
      },
      expected: EXTENDED_COLORS,
    }),
  ),
];

export const automatedMatrixCoverage = [
  'Variants canoniques par famille',
  'Échelles et defaults de taille par famille',
  'Paliers de couleurs sémantiques et étendus',
  'Noms canoniques des props communes, états et callbacks',
  'Documentation des valeurs par défaut publiques',
  'Props publiques découplées de Vanilla Extract',
  'Absence de any et de signatures index ouvertes',
  'Triplets controlled/uncontrolled déclarés explicitement',
  'Initialisation uncontrolled indépendante de la prop contrôlée',
  'Transmission des callbacks sans événement fabriqué',
  'Noms accessibles des contrôles et progressbars',
  'Orientation ARIA des séparateurs',
  'Rôle none cohérent sur les feedbacks',
  'Exports des slots composés et absence de doubles exports',
  'Exposition publique complète du thème',
  'Overrides de thème sans auto-référence CSS',
] as const;

export const consumerApiMatrixCoverage = [
  {
    surface: 'Props et types publics',
    rules:
      'public-any, public-broad-index-signature, noncanonical-common-prop, public-vanilla-extract-type',
    detects:
      'Types permissifs, alias non canoniques connus et dépendances publiques à Vanilla Extract.',
  },
  {
    surface: 'Variants, tailles, couleurs et defaults',
    rules: 'visual-*-vocabulary, visual-*-default, undocumented-public-default',
    detects:
      'Écarts aux vocabulaires, échelles et valeurs par défaut explicitement encodés depuis la matrice.',
  },
  {
    surface: 'Callbacks',
    rules: 'fabricated-event-details, noncanonical-common-prop',
    detects:
      'Détails d’événement fabriqués et alias connus de callbacks canoniques.',
  },
  {
    surface: 'Controlled / uncontrolled',
    rules: 'incomplete-controlled-triplet, controlled-prop-used-as-default',
    detects:
      'Triplets incomplets et initialisation de l’état interne depuis une prop contrôlée.',
  },
  {
    surface: 'Composition et exports',
    rules:
      'missing-compound-slot-props-export, duplicate-flat-compound-slot-export, theme-barrel-not-public',
    detects:
      'Types de slots manquants, valeurs de slots exportées deux fois et thème absent de l’entrée publique.',
  },
  {
    surface: 'Accessibilité observable',
    rules:
      'inaccessible-optional-label, unnamed-progressbar, separator-orientation, role-none-sentinel',
    detects:
      'Noms accessibles non garantis et désynchronisations ARIA directement observables dans les wrappers.',
  },
  {
    surface: 'Thème public',
    rules: 'theme-barrel-not-public, partial-theme-self-reference',
    detects:
      'Exports de thème incomplets et overrides partiels produisant une auto-référence CSS.',
  },
] as const;

export const manualMatrixLimitations = [
  "L'équivalence visuelle de deux recettes au pixel près nécessite un rendu navigateur ou une revue humaine.",
  'La pertinence métier de créer un nouveau variant ne peut pas être déduite de la syntaxe.',
  "Le comportement clavier et ARIA interne de Base UI est considéré conforme tant que le wrapper ne l'écrase pas.",
  'La qualité sémantique des noms, descriptions et textes localisés nécessite une revue humaine.',
] as const;
