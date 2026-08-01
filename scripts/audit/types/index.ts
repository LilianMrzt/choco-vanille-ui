export type PropInfo = {
  name: string;
  type: string;
};

export type ComponentInfo = {
  name: string;
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
