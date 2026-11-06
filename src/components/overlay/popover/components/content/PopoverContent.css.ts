import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    slideDownIn,
    slideDownOut,
    slideUpIn,
    slideUpOut,
    slideRightIn,
    slideRightOut,
    slideLeftIn,
    slideLeftOut,
} from '@constants/animations'

const paddingVariants = {
    0: {
        padding: vars.space[0],
    },
    1: {
        padding: vars.space[1],
    },
    2: {
        padding: vars.space[2],
    },
    4: {
        padding: vars.space[4],
    },
    6: {
        padding: vars.space[6],
    },
    8: {
        padding: vars.space[8],
    },
    10: {
        padding: vars.space[10],
    },
    12: {
        padding: vars.space[12],
    },
    14: {
        padding: vars.space[14],
    },
    16: {
        padding: vars.space[16],
    },
    18: {
        padding: vars.space[18],
    },
    20: {
        padding: vars.space[20],
    },
    24: {
        padding: vars.space[24],
    },
    28: {
        padding: vars.space[28],
    },
    32: {
        padding: vars.space[32],
    },
    48: {
        padding: vars.space[48],
    },
    64: {
        padding: vars.space[64],
    },
    80: {
        padding: vars.space[80],
    },
    96: {
        padding: vars.space[96],
    },
    112: {
        padding: vars.space[112],
    },
    128: {
        padding: vars.space[128],
    },
} as const

export const POPOVER_CONTENT_STYLES = {
    positioner: style({
        zIndex: vars.zIndex.popover,
    }),
    root: style({
        zIndex: vars.zIndex.popover,
        minWidth: '11rem',
        overflow: 'hidden',
        borderRadius: vars.radius[6],
        border: `1px solid ${vars.color.border.muted}`,
        backgroundColor: vars.color.surface.elevated,
        color: vars.color.surface.elevatedForeground,
        boxShadow: vars.shadow.lg,
        transformOrigin: 'var(--transform-origin)',

        '@media': {
            '(prefers-reduced-motion: reduce)': {
                selectors: {
                    '&[data-open][data-side], &[data-closed][data-side]': {
                        animation: 'none',
                    },
                },
            },
        },
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
    padding: recipe({
        base: {},
        variants: {
            padding: paddingVariants,
        },
        defaultVariants: {
            padding: 12,
        },
    }),
}
