import type { BoxProps } from '@components/layout/box/types'

export type CardBodyProps = Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'section'
}
