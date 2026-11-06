import type { Drawer } from '@base-ui/react/drawer'
import type { ReactElement } from 'react'

/**
 * Props for `BottomSheet.Trigger`.
 *
 * Pass your own element as `children` (e.g. `<Button />`); it is forwarded to
 * Base UI's `render` prop internally.
 */
export type BottomSheetTriggerProps = Omit<Drawer.Trigger.Props, 'render' | 'children'> & {
    /** The element that opens the bottom sheet — forwarded to Base UI's `render` prop. */
    children: ReactElement
}
