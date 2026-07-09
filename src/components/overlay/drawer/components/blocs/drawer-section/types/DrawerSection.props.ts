import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { TypographyProps } from '@components/foundation/typography'

/** Props for `Drawer.Section`. */
export type DrawerSectionProps = Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'section' */
  as?: 'section' | 'div';
  /** Uppercase title rendered above the section items. */
  title?: string;
  /** Extra props forwarded to the title `<Typography>` element. */
  titleProps?: TypographyProps;
};
