import type * as React from 'react'

import type { FlexProps } from '@components/layout/flex'
import type { TypographyProps } from '@components/foundation/typography'

/** Props for `Panel.Header`. */
export type PanelHeaderProps = Omit<FlexProps, 'as'> & {
  as?: 'div' | 'header';
  title?: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleProps?: TypographyProps;
  description?: string;
  descriptionProps?: TypographyProps;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  closeLabel?: string;
};
