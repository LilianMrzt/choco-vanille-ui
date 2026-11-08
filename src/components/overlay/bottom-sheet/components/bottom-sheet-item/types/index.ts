import type { ButtonHTMLAttributes, RefAttributes } from 'react'

import type { IconifyIcon } from '@components/foundation/icon'

/** Props for `BottomSheet.Item`. */
export type BottomSheetItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>
    & RefAttributes<HTMLButtonElement>
    & {
        /** Text label of the item. */
        label: string
        /** Icon rendered before the label. */
        startIcon?: IconifyIcon
        /** Icon rendered after the label. */
        endIcon?: IconifyIcon
        /** Renders the item with a destructive (danger) visual style. */
        destructive?: boolean
        /**
         * Whether activating the item closes the bottom sheet.
         * @default true
         */
        closeOnClick?: boolean
    }
