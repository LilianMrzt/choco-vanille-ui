import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import {
    slideDownIn, slideDownOut,
    slideUpIn, slideUpOut,
    slideRightIn, slideRightOut,
    slideLeftIn, slideLeftOut,
} from '@constants/animations'

export const DROPDOWN_MENU_CONTENT_STYLES = {
    root: style({
        zIndex: vars.zIndex.dropdown,
        overflow: 'hidden',
        borderRadius: vars.radius.lg,
        border: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.popover,
        flexGrow: 0,
        flexShrink: 0,
        color: vars.color.popoverForeground,
        padding: vars.space.xs,
        boxShadow: vars.shadow.lg,
        transformOrigin: 'var(--base-menu-content-transform-origin)',

        selectors: {
            '&[data-open][data-side="bottom"]': {
                animation: `${slideDownIn} 0.18s ${vars.easing.out} both`,
            },
            '&[data-closed][data-side="bottom"]': {
                animation: `${slideDownOut} 0.12s ${vars.easing.in} both`,
            },
            '&[data-open][data-side="top"]': {
                animation: `${slideUpIn} 0.18s ${vars.easing.out} both`,
            },
            '&[data-closed][data-side="top"]': {
                animation: `${slideUpOut} 0.12s ${vars.easing.in} both`,
            },
            '&[data-open][data-side="right"]': {
                animation: `${slideRightIn} 0.18s ${vars.easing.out} both`,
            },
            '&[data-closed][data-side="right"]': {
                animation: `${slideRightOut} 0.12s ${vars.easing.in} both`,
            },
            '&[data-open][data-side="left"]': {
                animation: `${slideLeftIn} 0.18s ${vars.easing.out} both`,
            },
            '&[data-closed][data-side="left"]': {
                animation: `${slideLeftOut} 0.12s ${vars.easing.in} both`,
            },
        },
    }),
}
