import type { FlexProps } from '@components/layout/flex'

/** Props for `Drawer.Footer`. */
export type DrawerFooterProps = Omit<FlexProps, 'as'> & {
    /** The HTML element to render. @default 'div' */
    as?: 'div' | 'footer'
}
