import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { fadeIn, fadeOut } from '@constants/animations'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.css.ts'

const alignedPositioner = style({
    selectors: {
        '&[data-align="start"][data-side="right"]': {
            marginTop: `calc(0px - ${vars.space[4]} - 1px)`,
        },
        '&[data-align="start"][data-side="left"]': {
            marginTop: `calc(0px - ${vars.space[4]} - 1px)`,
        },
        '&[data-align="start"][data-side="inline-end"]': {
            marginTop: `calc(0px - ${vars.space[4]} - 1px)`,
        },
        '&[data-align="start"][data-side="inline-start"]': {
            marginTop: `calc(0px - ${vars.space[4]} - 1px)`,
        },
    },
})

/**
 * Nested sub-menu panel. Inherits all base panel styles from
 * dropdownMenuContentClass and uses a simple fade instead of a directional
 * slide (since the side direction is always the same as the parent).
 */
export const DROPDOWN_MENU_SUB_CONTENT_STYLES = {
    alignedPositioner,
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
