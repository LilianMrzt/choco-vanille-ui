import type { FlexProps } from '@components/layout/flex'

/** Props for `Dialog.Footer`. */
export type DialogFooterProps = Readonly<Omit<FlexProps, 'as'> & {
    /** The HTML element to render. @default 'div' */
    as?: 'div' | 'footer'
}>
