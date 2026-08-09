import type { Tabs } from '@base-ui/react/tabs'
import type { CSSProperties } from 'react'
import type { IconComponent } from '@components/foundation/icon'

export type TabsTriggerProps = Omit<
  Tabs.Tab.Props,
  'children' | 'render'
> & {
  /** Overrides the default content-based (`fit-content`) width of the trigger. */
  width?: CSSProperties['width'];
  /** The text content rendered inside the trigger via the Typography component. */
  label: string;
  /** SVG component rendered before the label. */
  startIcon?: IconComponent;
  /** SVG component rendered after the label. */
  endIcon?: IconComponent;
}
