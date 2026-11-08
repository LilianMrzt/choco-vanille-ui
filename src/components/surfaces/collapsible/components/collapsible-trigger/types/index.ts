import type { Collapsible } from '@base-ui/react/collapsible'

import type { DataAttributes } from '@/types/DataAttributes.ts'
import type { IconifyIcon } from '@components/foundation/icon'

/** Props for the collapsible trigger. */
export type CollapsibleTriggerProps = Readonly<Omit<
  Collapsible.Trigger.Props,
  'children' | 'render'
> & {
  label?: string;
  startIcon?: IconifyIcon;
  endIcon?: IconifyIcon;
  children?: Collapsible.Trigger.Props['children'];
} & DataAttributes>
