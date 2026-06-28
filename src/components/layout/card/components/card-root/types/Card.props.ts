import type * as React from 'react'

import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type CardProps = Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'section' | 'article' | 'aside'
  children?: React.ReactNode
}
