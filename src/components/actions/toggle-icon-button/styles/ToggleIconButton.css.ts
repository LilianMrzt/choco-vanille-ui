import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { radius } from '@theme/tokens/radii.ts'
import { BUTTON_COLORS } from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

const pressedSelector = '&[data-pressed]'

export const TOGGLE_ICON_BUTTON_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            flexShrink: 0,
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
            },
        },
        variants: {
            variant: {
                outlined: {
                    borderColor: vars.color.border,
                    selectors: {
                        '&:hover': { backgroundColor: vars.color.secondarySubtle },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
                    },
                },
                ghost: {
                    borderColor: 'transparent',
                    selectors: {
                        '&:hover': { backgroundColor: vars.color.secondarySubtle },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
                    },
                },
            },
            color: {
                [BUTTON_COLORS.primary]: {
                    color: vars.color.primarySubtleForeground,
                    selectors: {
                        '&:hover': { color: vars.color.primarySubtleForeground },
                        '&:active': { color: vars.color.primarySubtleForeground },
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
                        '&:hover': { color: vars.color.secondarySubtleForeground },
                        '&:active': { color: vars.color.secondarySubtleForeground },
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
                        '&:hover': { color: vars.color.tertiaryForeground },
                        '&:active': { color: vars.color.tertiaryForeground },
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
                        '&:hover': { color: vars.color.destructiveSubtleForeground },
                        '&:active': { color: vars.color.destructiveSubtleForeground },
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
                        '&:hover': { color: vars.color.successSubtleForeground },
                        '&:active': { color: vars.color.successSubtleForeground },
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
                        '&:hover': { color: vars.color.warningSubtleForeground },
                        '&:active': { color: vars.color.warningSubtleForeground },
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
                        '&:hover': { color: vars.color.infoSubtleForeground },
                        '&:active': { color: vars.color.infoSubtleForeground },
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
                [ICON_BUTTON_SIZES.xs]: {
                    height: '2rem',
                    width: '2rem',
                },
                [ICON_BUTTON_SIZES.sm]: {
                    height: '2.25rem',
                    width: '2.25rem',
                },
                [ICON_BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    width: '2.5rem',
                },
                [ICON_BUTTON_SIZES.lg]: {
                    height: '2.75rem',
                    width: '2.75rem',
                },
            },
            radius: {
                none: { borderRadius: radius.none },
                xs: { borderRadius: radius.xs },
                sm: { borderRadius: radius.sm },
                md: { borderRadius: radius.md },
                lg: { borderRadius: radius.lg },
                xl: { borderRadius: radius.xl },
                '2xl': { borderRadius: radius['2xl'] },
                full: { borderRadius: radius.full },
            },
        },
        defaultVariants: {
            variant: 'outlined',
            color: BUTTON_COLORS.primary,
            size: ICON_BUTTON_SIZES.md,
            radius: 'sm',
        },
    }),
}

export type ToggleIconButtonRecipeVariants = NonNullable<
  RecipeVariants<typeof TOGGLE_ICON_BUTTON_STYLES.recipe>
>;
