import type { ButtonHTMLAttributes, RefAttributes } from 'react'

import type { IconComponent } from '@components/foundation/icon'

/** Props for `BottomSheet.Item`. */
export type BottomSheetItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>
    & RefAttributes<HTMLButtonElement>
    & {
        /** Text label of the item. */
        label: string
        /** Icon rendered before the label. */
        startIcon?: IconComponent
        /** Icon rendered after the label. */
        endIcon?: IconComponent
        /** Renders the item with a destructive (danger) visual style. */
        destructive?: boolean
        /**
         * Whether activating the item closes the bottom sheet.
         * @default true
         */
        closeOnClick?: boolean
    }
