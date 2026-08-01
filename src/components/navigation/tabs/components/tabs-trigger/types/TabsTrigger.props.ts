import type { Tabs } from '@base-ui/react/tabs'
import type { CSSProperties } from 'react'

export type TabsTriggerProps = Omit<
  Tabs.Tab.Props,
  'children' | 'render'
> & {
  /** Overrides the default content-based (`fit-content`) width of the trigger. */
  width?: CSSProperties['width'];
  /** The text content rendered inside the trigger via the Typography component. */
  label: string;
  /** Iconify icon name rendered before the label. */
  startIcon?: string;
  /** Iconify icon name rendered after the label. */
  endIcon?: string;
}
