import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { BADGE_COLORS_ARRAY } from '@components/data-display/badge/constants'
import {
    STATUS_BADGE_POSITIONS,
    STATUS_BADGE_SIZES,
} from '@components/data-display/status-badge/constants'
import type {
    StatusBadgePosition,
    StatusBadgeSize,
} from '@components/data-display/status-badge/types/StatusBadge.types.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

type ColorVarKey = keyof typeof vars.color

const positionVariants: Record<
  StatusBadgePosition,
  {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform: string;
  }
> = {
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

const sizeVariants: Record<
  StatusBadgeSize,
  { width: string; height: string; fontSize: string }
> = {
    [STATUS_BADGE_SIZES.sm]: {
        width: vars.space.sm,
        height: vars.space.sm,
        fontSize: vars.space.sm,
    },
    [STATUS_BADGE_SIZES.md]: {
        width: vars.space.sm2,
        height: vars.space.sm2,
        fontSize: vars.fontSize['2xs'],
    },
    [STATUS_BADGE_SIZES.lg]: {
        width: vars.space.md,
        height: vars.space.md,
        fontSize: vars.fontSize.xs,
    },
}

const colorVariants = Object.fromEntries(
    BADGE_COLORS_ARRAY.map((color) => [
        color,
        {
            backgroundColor: vars.color[color],
            color: vars.color[`${color}Foreground` as ColorVarKey],
        },
    ]),
)

export const STATUS_BADGE_STYLES = {
    root: style({
        position: 'relative',
        display: 'inline-block',
    }),
    number: style({
        display: 'block',
        transform: 'translateY(-0.5px)',
    }),
    indicator: recipe({
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
            lineHeight: vars.lineHeight.none,
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
                    width: vars.space.lg,
                    height: vars.space.lg,
                },
            },
            {
                variants: {
                    size: STATUS_BADGE_SIZES.md,
                    hasNumber: true,
                },
                style: {
                    width: vars.space.lg2,
                    height: vars.space.lg2,
                },
            },
            {
                variants: {
                    size: STATUS_BADGE_SIZES.lg,
                    hasNumber: true,
                },
                style: {
                    width: vars.space.xl,
                    height: vars.space.xl,
                },
            },
        ],
        defaultVariants: {
            color: 'primary',
            position: STATUS_BADGE_POSITIONS.topRight,
            size: STATUS_BADGE_SIZES.md,
            hasNumber: false,
        },
    }),
}
