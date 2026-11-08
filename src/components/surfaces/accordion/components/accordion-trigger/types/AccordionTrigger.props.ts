import type { Accordion } from '@base-ui/react/accordion'

import type { DataAttributes } from '@/types/DataAttributes.ts'
import type { IconifyIcon } from '@components/foundation/icon'

export type AccordionTriggerProps = Omit<
  Accordion.Trigger.Props,
  'children' | 'render'
> & {
  /** The text content rendered inside the trigger via the Typography component. */
  label?: string;
  /** local Iconify data rendered before the label. */
  startIcon?: IconifyIcon;
  /** local Iconify data rendered after the label. */
  endIcon?: IconifyIcon;
  /** Custom trigger content. Takes precedence over `label`. */
  children?: Accordion.Trigger.Props['children'];
} & DataAttributes
