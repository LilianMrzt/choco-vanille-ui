import type { Accordion } from '@base-ui/react/accordion'

import type { DataAttributes } from '@/types/DataAttributes.ts'
import type { IconComponent } from '@components/foundation/icon'

export type AccordionTriggerProps = Omit<
  Accordion.Trigger.Props,
  'children' | 'render'
> & {
  /** The text content rendered inside the trigger via the Typography component. */
  label?: string;
  /** Iconify icon name rendered before the label. */
  startIcon?: IconComponent;
  /** Iconify icon name rendered after the label. */
  endIcon?: IconComponent;
  /** Custom trigger content. Takes precedence over `label`. */
  children?: Accordion.Trigger.Props['children'];
} & DataAttributes
