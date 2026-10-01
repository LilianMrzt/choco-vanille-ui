import type { Drawer } from '@base-ui/react/drawer'
import type { ReactElement } from 'react'

/**
 * Props for `BottomSheet.Close`.
 *
 * Pass your own element as `children` (e.g. `<Button />`); it is forwarded to
 * Base UI's `render` prop internally.
 */
export type BottomSheetCloseProps = Omit<Drawer.Close.Props, 'render' | 'children'> & {
    /** The element that closes the bottom sheet — forwarded to Base UI's `render` prop. */
    children: ReactElement
}
