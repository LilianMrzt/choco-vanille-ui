import type { Collapsible } from '@base-ui/react/collapsible'

export type CollapsibleTriggerProps = Omit<
  Collapsible.Trigger.Props,
  'children' | 'render'
> & {
  label?: string;
  startIcon?: string;
  endIcon?: string;
  children?: Collapsible.Trigger.Props['children'];
}
