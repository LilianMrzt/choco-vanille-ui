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
    primary: vars.color.primarySubtle,
    secondary: vars.color.secondarySubtle,
    tertiary: vars.color.neutral,
    destructive: vars.color.dangerSubtle,
    success: vars.color.successSubtle,
    warning: vars.color.warningSubtle,
    info: vars.color.infoSubtle,
    purple: vars.color.accentPurpleSubtle,
    pink: vars.color.accentPinkSubtle,
    orange: vars.color.accentOrangeSubtle,
    teal: vars.color.accentTealSubtle,
    cyan: vars.color.accentCyanSubtle,
    indigo: vars.color.accentIndigoSubtle,
} as const

const PROGRESS_FILL_COLORS = {
    primary: vars.color.primary,
    secondary: vars.color.secondary,
    tertiary: vars.color.neutralSubtleBorder,
    destructive: vars.color.danger,
    success: vars.color.success,
    warning: vars.color.warning,
    info: vars.color.info,
    purple: vars.color.accentPurple,
    pink: vars.color.accentPink,
    orange: vars.color.accentOrange,
    teal: vars.color.accentTeal,
    cyan: vars.color.accentCyan,
    indigo: vars.color.accentIndigo,
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
    none: { borderRadius: vars.radius.none },
    xs: { borderRadius: vars.radius.xs },
    sm: { borderRadius: vars.radius.sm },
    md: { borderRadius: vars.radius.md },
    lg: { borderRadius: vars.radius.lg },
    xl: { borderRadius: vars.radius.xl },
    '2xl': { borderRadius: vars.radius['2xl'] },
    full: { borderRadius: vars.radius.full },
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
            borderRadius: 'sm',
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
            borderRadius: 'sm',
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
