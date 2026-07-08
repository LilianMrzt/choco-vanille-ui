import type * as React from 'react'

import type { Toggle } from '@base-ui/react/toggle'

import type { ToggleButtonRecipeVariants } from '@components/actions/toggle-button/styles/ToggleButton.css.ts'

export type ToggleButtonProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'color'
> &
    ToggleButtonRecipeVariants &
    Pick<Toggle.Props, 'pressed' | 'defaultPressed' | 'onPressedChange' | 'value' | 'disabled'> & {
        /** Ref forwarded to the underlying `<button>` element. */
        ref?: React.Ref<HTMLButtonElement>
        /** The text content rendered inside the toggle button. */
        label?: string
        /** Iconify icon name rendered before the label. Size and color are derived from the toggle button state and size. */
        startIcon?: string
        /** Iconify icon name rendered after the label. Size and color are derived from the toggle button state and size. */
        endIcon?: string
    }
