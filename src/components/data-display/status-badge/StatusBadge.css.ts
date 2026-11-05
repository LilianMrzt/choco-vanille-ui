import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { style, type StyleRule } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { BADGE_COLORS_ARRAY } from '@components/data-display/badge/constants'
import {
    STATUS_BADGE_POSITIONS,
    STATUS_BADGE_SIZES,
} from '@components/data-display/status-badge/constants'
import type {
    StatusBadgePosition,
    StatusBadgeSize,
} from '@components/data-display/status-badge/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

const positionVariants: Record<StatusBadgePosition, StyleRule> = {
    [STATUS_BADGE_POSITIONS.topLeft]: {
        top: '0',
        left: '0',
        transform: 'translate(-50%, -50%)',
    },
    [STATUS_BADGE_POSITIONS.topRight]: {
        top: '0',
        right: '0',
        transform: 'translate(50%, -50%)',
    },
    [STATUS_BADGE_POSITIONS.bottomLeft]: {
        bottom: '0',
        left: '0',
        transform: 'translate(-50%, 50%)',
    },
    [STATUS_BADGE_POSITIONS.bottomRight]: {
        bottom: '0',
        right: '0',
        transform: 'translate(50%, 50%)',
    },
}

const sizeVariants: Record<StatusBadgeSize, StyleRule> = {
    [STATUS_BADGE_SIZES.sm]: {
        width: vars.space[8],
        height: vars.space[8],
        fontSize: vars.space[8],
    },
    [STATUS_BADGE_SIZES.md]: {
        width: vars.space[10],
        height: vars.space[10],
        fontSize: vars.fontSize[10],
    },
    [STATUS_BADGE_SIZES.lg]: {
        width: vars.space[12],
        height: vars.space[12],
        fontSize: vars.fontSize[12],
    },
}

const colorVariants = Object.fromEntries(
    BADGE_COLORS_ARRAY.map((color) => [
        color,
        {
            backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].main,
            color: vars.color[COLOR_INTENT_TOKENS[color]].foreground,
        },
    ]),
)

const root = style({})

const number = style({
    display: 'block',
    transform: 'translateY(-0.5px)',
})

const indicator = recipe({
    base: {
        position: 'absolute',
        zIndex: vars.zIndex.docked,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${vars.color.background}`,
        borderRadius: vars.radius.full,
        boxSizing: 'border-box',
        fontFamily: vars.fontFamily.sans,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: '1',
        pointerEvents: 'none',
    },
    variants: {
        color: colorVariants,
        position: positionVariants,
        size: sizeVariants,
        hasNumber: {
            true: {},
            false: {},
        },
    },
    compoundVariants: [
        {
            variants: {
                size: STATUS_BADGE_SIZES.sm,
                hasNumber: true,
            },
            style: {
                minWidth: vars.space[16],
                width: 'auto',
                height: vars.space[16],
                paddingInline: vars.space[2],
            },
        },
        {
            variants: {
                size: STATUS_BADGE_SIZES.md,
                hasNumber: true,
            },
            style: {
                minWidth: vars.space[20],
                width: 'auto',
                height: vars.space[20],
                paddingInline: vars.space[2],
            },
        },
        {
            variants: {
                size: STATUS_BADGE_SIZES.lg,
                hasNumber: true,
            },
            style: {
                minWidth: vars.space[24],
                width: 'auto',
                height: vars.space[24],
                paddingInline: vars.space[2],
            },
        },
    ],
    defaultVariants: {
        color: 'primary',
        position: STATUS_BADGE_POSITIONS.topRight,
        size: STATUS_BADGE_SIZES.md,
        hasNumber: false,
    },
})

/** Wrapper, numeric label and indicator classes available for customization. */
export const STATUS_BADGE_STYLES = {
    root,
    number,
    indicator,
}
