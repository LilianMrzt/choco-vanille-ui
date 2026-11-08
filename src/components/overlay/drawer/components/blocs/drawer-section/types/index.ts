import type { BoxProps } from '@components/layout/box/types'
import type { DrawerSectionTitleProps } from '@components/overlay/drawer/components/blocs/drawer-section-title/types'

/** Props for `Drawer.Section`. */
export type DrawerSectionProps = Readonly<Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'section' */
  as?: 'section' | 'div';
  /** Title rendered above the items, preserving its supplied casing. */
  title?: string;
  /** Title typography overrides; use only with the title shortcut, not SectionTitle. */
  titleProps?: DrawerSectionTitleProps<'span'>;
}>
