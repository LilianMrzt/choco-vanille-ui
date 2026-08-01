import type {
  ArchitecturalSignal,
  ComponentInfo,
  ComponentKind,
  ComponentReference,
  ImplementationLeak
} from '../types/index.ts';
import {
  propSimilarityPairs,
  variantSimilarityPairs,
} from '../constants/index.ts';


export function componentKind(component: ComponentInfo): ComponentKind {
  if (component.scope === 'internal') return 'internal';
  return component.parentComponents.length > 0 ? 'compound' : 'root';
}

function implementationLeakReasons(type: string): string[] {
  const reasons: string[] = [];
  if (/\b\w*RecipeVariants\b/.test(type))
    reasons.push('RecipeVariants detected');
  if (/\b\w*Sprinkles\b/.test(type)) reasons.push('Sprinkles detected');
  if (/\bConditionalValue\b/.test(type))
    reasons.push('ConditionalValue detected');
  if (/@vanilla-extract|vanilla-extract/i.test(type))
    reasons.push('vanilla-extract type detected');
  if (/\b(?:Base[A-Z]\w*|BaseUI)\b/.test(type))
    reasons.push('Base UI type detected');
  if (/\bArk[A-Z]\w*\b/.test(type)) reasons.push('Ark UI type detected');
  if (
    /\b(?:React\.(?:ComponentProps|HTMLAttributes|SVGProps|DetailedHTMLProps|ElementRef|ForwardedRef)|ComponentProps(?:WithRef|WithoutRef)?|HTMLAttributes|SVGProps|DetailedHTMLProps|ElementRef|ForwardedRef)\b/.test(
      type,
    )
  ) {
    reasons.push('React implementation type detected');
  }
  return reasons;
}

function componentReference(component: ComponentInfo): ComponentReference {
  return { name: component.name, scope: component.scope };
}

function presentApiPropNames(components: ComponentInfo[]): Set<string> {
  return new Set(
    components
      .filter((component) => component.scope === 'public')
      .flatMap((component) => [
        ...component.props.map((prop) => prop.name),
        ...component.stylingProps,
      ]),
  );
}

export type ArchitectureResult = {
  implementationLeaks: ImplementationLeak[];
  architecturalSignals: ArchitecturalSignal[];
};

export function detectArchitecture(
  components: ComponentInfo[],
): ArchitectureResult {
  const implementationLeaks: ImplementationLeak[] = components.flatMap(
    (component) => {
      if (component.scope !== 'public') return [];
      return component.props.flatMap((prop) =>
        implementationLeakReasons(prop.type).map((reason) => ({
          component: component.name,
          prop: prop.name,
          reason,
        })),
      );
    },
  );

  const variants = new Set(
    components.flatMap((component) => component.variants),
  );
  const props = presentApiPropNames(components);
  const architecturalSignals: ArchitecturalSignal[] = [];

  for (const [left, right, confidence] of variantSimilarityPairs) {
    if (variants.has(left) && variants.has(right)) {
      architecturalSignals.push({
        kind: 'variant-similarity',
        values: [left, right],
        confidence,
      });
    }
  }
  for (const [left, right, confidence] of propSimilarityPairs) {
    if (props.has(left) && props.has(right)) {
      architecturalSignals.push({
        kind: 'prop-similarity',
        values: [left, right],
        confidence,
      });
    }
  }

  return { implementationLeaks, architecturalSignals };
}

export function buildComponentGroups(components: ComponentInfo[]): {
  public: ComponentReference[];
  internal: ComponentReference[];
} {
  return {
    public: components
      .filter((component) => component.scope === 'public')
      .map(componentReference),
    internal: components
      .filter((component) => component.scope === 'internal')
      .map(componentReference),
  };
}

export function buildValueIndex(
  components: ComponentInfo[],
  valuesForComponent: (component: ComponentInfo) => string[],
): Record<string, ComponentReference[]> {
  const index = new Map<string, ComponentReference[]>();
  for (const component of components) {
    for (const value of valuesForComponent(component)) {
      const owners = index.get(value) ?? [];
      owners.push(componentReference(component));
      index.set(value, owners);
    }
  }
  return Object.fromEntries(
    [...index.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([value, owners]) => [
        value,
        owners.sort((left, right) => left.name.localeCompare(right.name)),
      ]),
  );
}

export function buildPropsIndex(
  components: ComponentInfo[],
): Record<string, (ComponentReference & { type: string })[]> {
  const index = new Map<string, (ComponentReference & { type: string })[]>();
  for (const component of components) {
    for (const prop of component.props) {
      const owners = index.get(prop.name) ?? [];
      owners.push({ ...componentReference(component), type: prop.type });
      index.set(prop.name, owners);
    }
  }
  return Object.fromEntries(
    [...index.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, owners]) => [
        name,
        owners.sort((left, right) => left.name.localeCompare(right.name)),
      ]),
  );
}
