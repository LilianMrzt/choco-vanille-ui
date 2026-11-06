import type { FlexProps } from '@components/layout/flex'

/** Props for the footer of a card. */
export type CardFooterProps = Readonly<Omit<FlexProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'footer'
}>
