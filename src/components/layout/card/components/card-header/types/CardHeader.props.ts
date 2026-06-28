import type * as React from 'react'

import type { FlexProps } from '@components/layout/flex'
import type { TypographyProps } from '@components/foundation/typography'

export type CardHeaderProps = Omit<FlexProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'header'
  /** Title text rendered as a heading inside the header. */
  title?: string
  /** Heading level for the title element. @default 'h3' */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Extra props forwarded to the title `<Typography>` element. */
  titleProps?: Omit<TypographyProps, 'children'>
  /** Muted description text rendered below the title. */
  description?: string
  /** Extra props forwarded to the description `<Typography>` element. */
  descriptionProps?: Omit<TypographyProps, 'children'>
  /** Content rendered in the trailing corner — e.g. an `<IconButton>` or `<Button>`. */
  actions?: React.ReactNode
}
