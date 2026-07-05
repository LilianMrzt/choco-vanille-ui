import type * as React from 'react'
import type * as RadixTabs from '@radix-ui/react-tabs'

export type TabsTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof RadixTabs.Trigger>,
  'children'
> & {
  /** Overrides the default content-based (`fit-content`) width of the trigger. */
  width?: React.CSSProperties['width'];
  /** The text content rendered inside the trigger via the Typography component. */
  label?: string;
  /** Iconify icon name rendered before the label. */
  startIcon?: string;
  /** Iconify icon name rendered after the label. */
  endIcon?: string;
}
