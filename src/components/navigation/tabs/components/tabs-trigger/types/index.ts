import type { Tabs } from '@base-ui/react/tabs'
import type { CSSProperties } from 'react'
import type { IconifyIcon } from '@components/foundation/icon'

export type TabsTriggerProps = Readonly<Omit<
  Tabs.Tab.Props,
  'children' | 'render'
> & {
  /** Overrides the default content-based (`fit-content`) width of the trigger. */
  width?: CSSProperties['width'];
  /** The text content rendered inside the trigger via the Typography component. */
  label: string;
  /** local Iconify data rendered before the label. */
  startIcon?: IconifyIcon;
  /** local Iconify data rendered after the label. */
  endIcon?: IconifyIcon;
}>
