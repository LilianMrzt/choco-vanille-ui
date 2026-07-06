import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import { fadeIn, fadeOut } from '@constants/animations/index.ts'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.css.ts'

/**
 * Nested sub-menu panel. Inherits all base panel styles from
 * dropdownMenuContentClass and uses a simple fade instead of a directional
 * slide (since the side direction is always the same as the parent).
 */
export const DROPDOWN_MENU_SUB_CONTENT_STYLES = {
    root: style([
        DROPDOWN_MENU_CONTENT_STYLES.root,
        {
            selectors: {
                '&[data-open]': {
                    animation: `${fadeIn} 0.15s ${vars.easing.out} both`,
                },
                '&[data-closed]': {
                    animation: `${fadeOut} 0.10s ${vars.easing.in} both`,
                },
            },
        },
    ]),
}
