import type * as React from 'react'

import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type CardProps = Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'section' | 'article' | 'aside'
}

export type CardHeaderProps = Omit<BoxProps, 'as'> & {
  as?: 'div' | 'header'
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  React.RefAttributes<HTMLHeadingElement> & {
  /** The heading level to render. @default 'h3' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> &
  React.RefAttributes<HTMLParagraphElement>

export type CardBodyProps = Omit<BoxProps, 'as'> & {
  as?: 'div' | 'section'
}

export type CardFooterProps = Omit<BoxProps, 'as'> & {
  as?: 'div' | 'footer'
}
