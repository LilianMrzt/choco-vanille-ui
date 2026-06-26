import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import { fadeIn, fadeOut } from '@constants/animations/index.ts'
import { dropdownMenuContentClass } from '@components/overlay/dropdown-menu/components/content/dropdown-menu-content/DropdownMenuContent.css.ts'

/**
 * Nested sub-menu panel. Inherits all base panel styles from
 * dropdownMenuContentClass and uses a simple fade instead of a directional
 * slide (since the side direction is always the same as the parent).
 */
export const dropdownMenuSubContentClass = style([
    dropdownMenuContentClass,
    {
        selectors: {
            '&[data-state="open"]': {
                animation: `${fadeIn} 0.15s ${vars.easing.out} both`,
            },
            '&[data-state="closed"]': {
                animation: `${fadeOut} 0.10s ${vars.easing.in} both`,
            },
        },
    },
])
