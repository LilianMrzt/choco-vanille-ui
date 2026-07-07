import type { Accordion } from '@base-ui/react/accordion'

export type AccordionTriggerProps = Omit<
  Accordion.Trigger.Props,
  'children' | 'render'
> & {
  /** The text content rendered inside the trigger via the Typography component. */
  label?: string;
  /** Iconify icon name rendered before the label. */
  startIcon?: string;
  /** Iconify icon name rendered after the label. */
  endIcon?: string;
  /** Custom trigger content. Takes precedence over `label`. */
  children?: Accordion.Trigger.Props['children'];
};
