import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
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
    none: { padding: SPACE_VARIANTS.none },
    px: { padding: SPACE_VARIANTS.px },
    xxs: { padding: SPACE_VARIANTS.xxs },
    xs: { padding: SPACE_VARIANTS.xs },
    xs2: { padding: SPACE_VARIANTS.xs2 },
    sm: { padding: SPACE_VARIANTS.sm },
    sm2: { padding: SPACE_VARIANTS.sm2 },
    md: { padding: SPACE_VARIANTS.md },
    md2: { padding: SPACE_VARIANTS.md2 },
    lg: { padding: SPACE_VARIANTS.lg },
    lg2: { padding: SPACE_VARIANTS.lg2 },
    xl: { padding: SPACE_VARIANTS.xl },
    '2xl': { padding: SPACE_VARIANTS['2xl'] },
    '3xl': { padding: SPACE_VARIANTS['3xl'] },
    '4xl': { padding: SPACE_VARIANTS['4xl'] },
    '5xl': { padding: SPACE_VARIANTS['5xl'] },
} as const

export const POPOVER_CONTENT_STYLES = {
    positioner: style({
        zIndex: vars.zIndex.popover,
    }),
    root: style({
        zIndex: vars.zIndex.popover,
        minWidth: '11rem',
        overflow: 'hidden',
        borderRadius: vars.radius.sm,
        border: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.surfaceElevated,
        color: vars.color.surfaceElevatedForeground,
        boxShadow: vars.shadow.lg,
        transformOrigin: 'var(--transform-origin)',

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
            padding: 'md',
        },
    }),
}
