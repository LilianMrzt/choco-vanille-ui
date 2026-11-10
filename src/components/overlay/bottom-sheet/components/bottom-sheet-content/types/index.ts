import type { Drawer } from '@base-ui/react/drawer'
import type { CSSProperties } from 'react'

/** Props for `BottomSheet.Content`. */
export type BottomSheetContentProps = Drawer.Popup.Props & {
    /** CSS width of the panel. Defaults to 100%, constrained by maxWidth. */
    width?: CSSProperties['width']
    /** CSS minimum width of the panel. */
    minWidth?: CSSProperties['minWidth']
    /** CSS maximum width of the panel. Defaults to 40rem. */
    maxWidth?: CSSProperties['maxWidth']
    /** CSS height of the panel. Defaults to its content height, constrained by maxHeight. */
    height?: CSSProperties['height']
    /** CSS minimum height of the panel. */
    minHeight?: CSSProperties['minHeight']
    /** CSS maximum height of the panel. Defaults to calc(100dvh - 3rem). */
    maxHeight?: CSSProperties['maxHeight']
    /**
     * Whether to render the drag handle at the top of the sheet.
     * @default true
     */
    showHandle?: boolean
    /**
     * Accessible name used when neither `aria-label`, `aria-labelledby` nor a
     * `BottomSheet.Header` title is provided. Override this for i18n.
     * @default 'Bottom sheet'
     */
    defaultAriaLabel?: string
}
