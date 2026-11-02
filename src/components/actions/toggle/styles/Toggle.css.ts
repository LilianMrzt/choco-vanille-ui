import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { RADIUS } from '@theme/tokens/radius/radius.const.ts'
import {
    BUTTON_COLORS_ARRAY,
    BUTTON_COLORS,
    BUTTON_SIZES,
} from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

const pressedSelector = '&[data-pressed]'
const subtleCompoundVariants = BUTTON_COLORS_ARRAY.flatMap((color) =>
    (['ghost', 'outlined'] as const).map((variant) => ({
        variants: { variant, color, subtle: true },
        style: {
            borderColor: variant === 'outlined'
                ? vars.color.border
                : 'transparent',
            color: vars.color[`${color}SubtleForeground`],
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color[`${color}Subtle`],
                    color: vars.color[`${color}SubtleForeground`],
                },
                '&:active': {
                    backgroundColor: vars.color[`${color}SubtleActive`],
                    color: vars.color[`${color}SubtleForeground`],
                },
                [pressedSelector]: {
                    backgroundColor: vars.color[`${color}SubtleActive`],
                    color: vars.color[`${color}SubtleForeground`],
                    borderColor: variant === 'outlined'
                        ? vars.color[color]
                        : 'transparent',
                },
                [`${pressedSelector}:hover`]: {
                    backgroundColor: vars.color[`${color}Subtle`],
                    color: vars.color[`${color}SubtleForeground`],
                },
                [`${pressedSelector}:active`]: {
                    backgroundColor: vars.color[`${color}SubtleActive`],
                    color: vars.color[`${color}SubtleForeground`],
                },
            },
        },
    })),
)

export const TOGGLE_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            gap: vars.space.sm,
            whiteSpace: 'nowrap',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: vars.color.mutedForeground,
            fontWeight: vars.fontWeight.medium,
            selectors: {
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                },
                '&:disabled': {
                    pointerEvents: 'none',
                    opacity: 0.5,
                },
                '&[data-icon-only]': {
                    aspectRatio: '1',
                    paddingInline: 0,
                },
            },
        },
        variants: {
            variant: {
                outlined: {
                    borderColor: vars.color.border,
                },
                ghost: {
                    borderColor: 'transparent',
                },
            },
            subtle: {
                true: {
                    backgroundColor: 'transparent',
                },
                false: {},
            },
            color: {
                [BUTTON_COLORS.primary]: {
                    color: vars.color.primarySubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.primarySubtleForeground,
                            backgroundColor: vars.color.primarySubtle,
                        },
                        '&:active': {
                            color: vars.color.primarySubtleForeground,
                            backgroundColor: vars.color.primarySubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.primary,
                            color: vars.color.primaryForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.primaryHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.primaryActive,
                        },
                    },
                },
                [BUTTON_COLORS.secondary]: {
                    color: vars.color.secondarySubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.secondarySubtleForeground,
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': {
                            color: vars.color.secondarySubtleForeground,
                            backgroundColor: vars.color.secondarySubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.secondary,
                            color: vars.color.secondaryForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.secondaryHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.secondaryActive,
                        },
                    },
                },
                [BUTTON_COLORS.tertiary]: {
                    color: vars.color.tertiaryForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.tertiaryForeground,
                            backgroundColor: vars.color.tertiarySubtle,
                        },
                        '&:active': {
                            color: vars.color.tertiaryForeground,
                            backgroundColor: vars.color.tertiarySubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.tertiary,
                            color: vars.color.tertiaryForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.tertiaryHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.tertiaryActive,
                        },
                    },
                },
                [BUTTON_COLORS.destructive]: {
                    color: vars.color.destructiveSubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.destructiveSubtleForeground,
                            backgroundColor: vars.color.destructiveSubtle,
                        },
                        '&:active': {
                            color: vars.color.destructiveSubtleForeground,
                            backgroundColor: vars.color.destructiveSubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.destructive,
                            color: vars.color.destructiveForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.destructiveHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.destructiveActive,
                        },
                    },
                },
                [BUTTON_COLORS.success]: {
                    color: vars.color.successSubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.successSubtleForeground,
                            backgroundColor: vars.color.successSubtle,
                        },
                        '&:active': {
                            color: vars.color.successSubtleForeground,
                            backgroundColor: vars.color.successSubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.success,
                            color: vars.color.successForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.successHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.successActive,
                        },
                    },
                },
                [BUTTON_COLORS.warning]: {
                    color: vars.color.warningSubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.warningSubtleForeground,
                            backgroundColor: vars.color.warningSubtle,
                        },
                        '&:active': {
                            color: vars.color.warningSubtleForeground,
                            backgroundColor: vars.color.warningSubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.warning,
                            color: vars.color.warningForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.warningHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.warningActive,
                        },
                    },
                },
                [BUTTON_COLORS.info]: {
                    color: vars.color.infoSubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.infoSubtleForeground,
                            backgroundColor: vars.color.infoSubtle,
                        },
                        '&:active': {
                            color: vars.color.infoSubtleForeground,
                            backgroundColor: vars.color.infoSubtleActive,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.info,
                            color: vars.color.infoForeground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.infoHover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.infoActive,
                        },
                    },
                },
            },
            size: {
                [BUTTON_SIZES.sm]: {
                    height: '2.25rem',
                    paddingInline: vars.space.md,
                },
                [BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    paddingInline: vars.space.lg,
                },
                [BUTTON_SIZES.lg]: {
                    height: '2.75rem',
                    paddingInline: vars.space['2xl'],
                },
            },
            radius: {
                none: { borderRadius: RADIUS.none },
                xs: { borderRadius: RADIUS.xs },
                sm: { borderRadius: RADIUS.sm },
                md: { borderRadius: RADIUS.md },
                lg: { borderRadius: RADIUS.lg },
                xl: { borderRadius: RADIUS.xl },
                '2xl': { borderRadius: RADIUS['2xl'] },
                full: { borderRadius: RADIUS.full },
            },
        },
        compoundVariants: subtleCompoundVariants,
        defaultVariants: {
            variant: 'outlined',
            color: BUTTON_COLORS.primary,
            size: BUTTON_SIZES.md,
            radius: 'sm',
        },
    }),
}
