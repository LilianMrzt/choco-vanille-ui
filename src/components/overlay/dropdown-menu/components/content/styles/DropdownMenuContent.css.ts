import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    slideDownIn, slideDownOut,
    slideUpIn, slideUpOut,
    slideRightIn, slideRightOut,
    slideLeftIn, slideLeftOut,
} from '@constants/animations'

export const DROPDOWN_MENU_CONTENT_STYLES = {
    positioner: style({
        zIndex: vars.zIndex.dropdown,
    }),
    root: style({
        zIndex: vars.zIndex.dropdown,
        overflow: 'hidden',
        borderRadius: vars.radius.md,
        border: `1px solid ${vars.color.border.main}`,
        backgroundColor: vars.color.surface.elevated,
        flexGrow: 0,
        flexShrink: 0,
        color: vars.color.surface.elevatedForeground,
        padding: vars.space.xs,
        boxShadow: vars.shadow.lg,
        outline: 'none',
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
