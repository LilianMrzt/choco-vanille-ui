import type { FlexProps } from '@components/layout/flex'

/** Props for `Drawer.Header`. */
export type DrawerHeaderProps = Readonly<Omit<FlexProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'header';
}>
