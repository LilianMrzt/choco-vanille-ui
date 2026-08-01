export type PropInfo = {
  name: string;
  type: string;
};

export type ComponentInfo = {
  name: string;
  sourcePath: string;
  category: string;
  scope: 'public' | 'internal';
  props: PropInfo[];
  variants: string[];
  statuses: string[];
  tones: string[];
  rawDimensions: string[];
  stylingProps: string[];
  vanillaExtractStyleBases: VanillaExtractStyleBase[];
  exports: string[];
  subComponents: string[];
  parentComponents: string[];
};

export type ComponentKind = 'root' | 'compound' | 'internal';

export type ImplementationLeak = {
  component: string;
  prop: string;
  reason: string;
};

export type ArchitecturalSignal = {
  kind: 'variant-similarity' | 'prop-similarity';
  values: [string, string];
  confidence: number;
};

export type ComponentReference = {
  name: string;
  scope: ComponentInfo['scope'];
};

export type VanillaExtractStyleBase = {
  propsType: string;
  styleType: string;
  source: string;
};

export type ConsistencyFindingSeverity = 'error' | 'warning';

export type ConsistencyFindingCategory =
  | 'accessibility'
  | 'callbacks'
  | 'controlled-state'
  | 'encapsulation'
  | 'exports'
  | 'theme'
  | 'type-safety'
  | 'visual-consistency';

export type ConsistencyFinding = {
  rule: string;
  severity: ConsistencyFindingSeverity;
  category: ConsistencyFindingCategory;
  component?: string;
  symbol?: string;
  file: string;
  line: number;
  message: string;
  evidence: string;
  remediation: string;
};
