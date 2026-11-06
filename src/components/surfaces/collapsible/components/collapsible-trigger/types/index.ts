import type { Collapsible } from '@base-ui/react/collapsible'

import type { DataAttributes } from '@/types/DataAttributes.ts'
import type { IconComponent } from '@components/foundation/icon'

/** Props for the collapsible trigger. */
export type CollapsibleTriggerProps = Readonly<Omit<
  Collapsible.Trigger.Props,
  'children' | 'render'
> & {
  label?: string;
  startIcon?: IconComponent;
  endIcon?: IconComponent;
  children?: Collapsible.Trigger.Props['children'];
} & DataAttributes>
