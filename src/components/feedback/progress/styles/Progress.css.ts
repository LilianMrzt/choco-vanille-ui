import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    PROGRESS_COLORS_ARRAY,
    PROGRESS_SIZE_TO_CIRCULAR_SIZE,
    PROGRESS_SIZE_TO_HEIGHT,
    PROGRESS_SIZE_TO_STROKE_WIDTH,
} from '@components/feedback/progress/constants'
import type { ProgressBorderRadius } from '@components/feedback/progress/types/Progress.types.ts'

const PROGRESS_TRACK_COLORS = {
    primary: vars.color.primary.subtle,
    secondary: vars.color.secondary.subtle,
    tertiary: vars.color.neutral.main,
    destructive: vars.color.danger.subtle,
    success: vars.color.success.subtle,
    warning: vars.color.warning.subtle,
    info: vars.color.info.subtle,
    purple: vars.color.accentPurple.subtle,
    pink: vars.color.accentPink.subtle,
    orange: vars.color.accentOrange.subtle,
    teal: vars.color.accentTeal.subtle,
    cyan: vars.color.accentCyan.subtle,
    indigo: vars.color.accentIndigo.subtle,
} as const

const PROGRESS_FILL_COLORS = {
    primary: vars.color.primary.main,
    secondary: vars.color.secondary.main,
    tertiary: vars.color.neutral.subtleBorder,
    destructive: vars.color.danger.main,
    success: vars.color.success.main,
    warning: vars.color.warning.main,
    info: vars.color.info.main,
    purple: vars.color.accentPurple.main,
    pink: vars.color.accentPink.main,
    orange: vars.color.accentOrange.main,
    teal: vars.color.accentTeal.main,
    cyan: vars.color.accentCyan.main,
    indigo: vars.color.accentIndigo.main,
} as const

const colorCompoundVariants = PROGRESS_COLORS_ARRAY.map((color) => ({
    variants: { color },
    style: {
        backgroundColor: PROGRESS_TRACK_COLORS[color],
    },
}))

const BORDER_RADIUS_VARIANTS: Record<
  ProgressBorderRadius,
  { borderRadius: string }
> = {
    0: {
        borderRadius: vars.radius[0],
    },
    4: {
        borderRadius: vars.radius[4],
    },
    6: {
        borderRadius: vars.radius[6],
    },
    8: {
        borderRadius: vars.radius[8],
    },
    10: {
        borderRadius: vars.radius[10],
    },
    14: {
        borderRadius: vars.radius[14],
    },
    20: {
        borderRadius: vars.radius[20],
    },
    'full': {
        borderRadius: vars.radius['full'],
    },
}

export const PROGRESS_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
            overflow: 'hidden',
        },

        variants: {
            size: {
                xs: { height: PROGRESS_SIZE_TO_HEIGHT.xs },
                sm: { height: PROGRESS_SIZE_TO_HEIGHT.sm },
                md: { height: PROGRESS_SIZE_TO_HEIGHT.md },
                lg: { height: PROGRESS_SIZE_TO_HEIGHT.lg },
                xl: { height: PROGRESS_SIZE_TO_HEIGHT.xl },
            },
            borderRadius: BORDER_RADIUS_VARIANTS,
            color: Object.fromEntries(
                PROGRESS_COLORS_ARRAY.map((color) => [color, {}]),
            ),
        },

        compoundVariants: colorCompoundVariants,

        defaultVariants: {
            size: 'sm',
            borderRadius: 6,
            color: 'primary',
        },
    }),

    fill: recipe({
        base: {
            height: '100%',
            transition: `width ${vars.duration.normal} ${vars.easing.standard}`,
            '@media': {
                '(prefers-reduced-motion: reduce)': {
                    transition: 'none',
                },
            },
        },
        variants: {
            borderRadius: BORDER_RADIUS_VARIANTS,
            color: Object.fromEntries(
                PROGRESS_COLORS_ARRAY.map((color) => [
                    color,
                    { backgroundColor: PROGRESS_FILL_COLORS[color] },
                ]),
            ),
        },
        defaultVariants: {
            borderRadius: 6,
            color: 'primary',
        },
    }),

    circular: recipe({
        base: {
            display: 'block',
            transform: 'rotate(-90deg)',
        },

        variants: {
            size: {
                xs: {
                    width: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.xs}px`,
                    height: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.xs}px`,
                },
                sm: {
                    width: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.sm}px`,
                    height: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.sm}px`,
                },
                md: {
                    width: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.md}px`,
                    height: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.md}px`,
                },
                lg: {
                    width: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.lg}px`,
                    height: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.lg}px`,
                },
                xl: {
                    width: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.xl}px`,
                    height: `${PROGRESS_SIZE_TO_CIRCULAR_SIZE.xl}px`,
                },
            },
        },

        defaultVariants: {
            size: 'sm',
        },
    }),

    circularTrack: recipe({
        base: {
            fill: 'none',
            strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.sm,
            transition: `stroke-dashoffset ${vars.duration.normal} ${vars.easing.standard}`,
            '@media': {
                '(prefers-reduced-motion: reduce)': {
                    transition: 'none',
                },
            },
        },
        variants: {
            size: {
                xs: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.xs },
                sm: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.sm },
                md: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.md },
                lg: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.lg },
                xl: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.xl },
            },
            color: Object.fromEntries(
                PROGRESS_COLORS_ARRAY.map((color) => [
                    color,
                    { stroke: PROGRESS_TRACK_COLORS[color] },
                ]),
            ),
        },
        defaultVariants: {
            size: 'sm',
            color: 'primary',
        },
    }),

    circularIndicator: recipe({
        base: {
            fill: 'none',
            strokeLinecap: 'round',
            transition: `stroke-dashoffset ${vars.duration.normal} ${vars.easing.standard}`,
            '@media': {
                '(prefers-reduced-motion: reduce)': {
                    transition: 'none',
                },
            },
        },
        variants: {
            size: {
                xs: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.xs },
                sm: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.sm },
                md: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.md },
                lg: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.lg },
                xl: { strokeWidth: PROGRESS_SIZE_TO_STROKE_WIDTH.xl },
            },
            color: Object.fromEntries(
                PROGRESS_COLORS_ARRAY.map((color) => [
                    color,
                    { stroke: PROGRESS_FILL_COLORS[color] },
                ]),
            ),
        },
        defaultVariants: {
            size: 'sm',
            color: 'primary',
        },
    }),
}

export type ProgressRecipeVariants = NonNullable<
  RecipeVariants<typeof PROGRESS_STYLES.recipe>
>;
