import type { Drawer } from '@base-ui/react/drawer'

/** Props for `BottomSheet.Content`. */
export type BottomSheetContentProps = Drawer.Popup.Props & {
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
