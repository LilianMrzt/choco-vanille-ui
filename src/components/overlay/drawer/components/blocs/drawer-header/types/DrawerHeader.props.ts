import type * as React from 'react'

import type { FlexProps } from '@components/layout/flex'
import type { TypographyProps } from '@components/foundation/typography'

/** Props for `Drawer.Header`. */
export type DrawerHeaderProps = Omit<FlexProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'header';
  /** Title text rendered as the drawer title. */
  title?: string;
  /** Heading level for the title element. @default 'h2' */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Extra props forwarded to the title `<Typography>` element. */
  titleProps?: TypographyProps;
  /** Muted description text rendered below the title. */
  description?: string;
  /** Extra props forwarded to the description `<Typography>` element. */
  descriptionProps?: TypographyProps;
  /** Content rendered in the trailing corner — e.g. a close button. */
  actions?: React.ReactNode;
  /**
   * Whether to show the default close button in the trailing corner.
   * Hidden when `actions` is provided.
   * @default true
   */
  showCloseButton?: boolean;
};
