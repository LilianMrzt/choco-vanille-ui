import type { FlexProps } from '@components/layout/flex'

export type CardFooterProps = Omit<FlexProps, 'as'> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'footer'
}
