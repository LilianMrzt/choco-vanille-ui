import type * as React from 'react'

import type { Toggle } from '@base-ui/react/toggle'

import type { ToggleButtonGroupItemRecipeVariants } from '@components/actions/toggle-button-group/components/toggle-button-group-item/styles/ToggleButtonGroupItem.css.ts'

export type ToggleButtonGroupItemProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'color'
> &
    Pick<ToggleButtonGroupItemRecipeVariants, 'size' | 'color'> &
    Pick<Toggle.Props, 'value' | 'disabled'> & {
        /** Ref forwarded to the underlying `<button>` element. */
        ref?: React.Ref<HTMLButtonElement>
        /** The text content rendered inside the item. */
        label?: string
        /** Iconify icon name rendered before the label. */
        startIcon?: string
        /** Iconify icon name rendered after the label. */
        endIcon?: string
    }
