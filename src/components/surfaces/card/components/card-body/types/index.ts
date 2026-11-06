import type { BoxProps } from '@components/layout/box/types'

/** Props for the body of a card. */
export type CardBodyProps = Readonly<Omit<BoxProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'section'
}>
