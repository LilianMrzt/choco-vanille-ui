import type { BoxProps } from '@components/layout/box/types'

/** Props for `Dialog.Body`. */
export type DialogBodyProps = Omit<BoxProps, 'as'> & {
    /** The HTML element to render. @default 'div' */
    as?: 'div' | 'section'
}
