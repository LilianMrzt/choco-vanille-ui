import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import {
    slideDownIn, slideDownOut,
    slideUpIn, slideUpOut,
    slideRightIn, slideRightOut,
    slideLeftIn, slideLeftOut,
} from '@constants/animations/index.ts'

/**
 * The floating panel that appears below (or beside) the trigger.
 * Uses box-shadow for elevation — cleaner than filter: drop-shadow for
 * rectangular surfaces.
 */
export const dropdownMenuContentClass = style({
    zIndex: vars.zIndex.dropdown,
    minWidth: '11rem',
    overflow: 'hidden',
    borderRadius: vars.radius.lg,
    border: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.popover,
    color: vars.color.popoverForeground,
    padding: vars.space.xs,
    boxShadow: vars.shadow.lg,
    transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',

    selectors: {
        '&[data-state="open"][data-side="bottom"]': {
            animation: `${slideDownIn} 0.18s ${vars.easing.out} both`,
        },
        '&[data-state="closed"][data-side="bottom"]': {
            animation: `${slideDownOut} 0.12s ${vars.easing.in} both`,
        },
        '&[data-state="open"][data-side="top"]': {
            animation: `${slideUpIn} 0.18s ${vars.easing.out} both`,
        },
        '&[data-state="closed"][data-side="top"]': {
            animation: `${slideUpOut} 0.12s ${vars.easing.in} both`,
        },
        '&[data-state="open"][data-side="right"]': {
            animation: `${slideRightIn} 0.18s ${vars.easing.out} both`,
        },
        '&[data-state="closed"][data-side="right"]': {
            animation: `${slideRightOut} 0.12s ${vars.easing.in} both`,
        },
        '&[data-state="open"][data-side="left"]': {
            animation: `${slideLeftIn} 0.18s ${vars.easing.out} both`,
        },
        '&[data-state="closed"][data-side="left"]': {
            animation: `${slideLeftOut} 0.12s ${vars.easing.in} both`,
        },
    },
})
