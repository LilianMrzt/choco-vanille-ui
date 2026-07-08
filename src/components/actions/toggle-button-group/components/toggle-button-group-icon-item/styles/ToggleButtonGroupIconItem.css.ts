import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import {
    BUTTON_COLORS,
    BUTTON_SIZES,
} from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { radius } from '@theme/tokens/radii.ts'
import { vars } from '@theme/contract.css.ts'

const pressedSelector = '&[data-pressed]'

export const TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: vars.color.mutedForeground,
            fontWeight: vars.fontWeight.medium,
            borderRadius: 'var(--toggle-button-group-item-radius)',
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
            color: {
                [BUTTON_COLORS.primary]: {
                    color: vars.color.primarySubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.primarySubtleForeground,
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                    color: vars.color.secondaryForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.secondaryForeground,
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                [BUTTON_COLORS.destructive]: {
                    color: vars.color.destructiveSubtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.destructiveSubtleForeground,
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                            backgroundColor: vars.color.secondarySubtle,
                        },
                        '&:active': { backgroundColor: vars.color.secondarySubtleActive },
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
                    width: '2.25rem',
                },
                [BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    width: '2.5rem',
                },
                [BUTTON_SIZES.lg]: {
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
            color: BUTTON_COLORS.primary,
            size: BUTTON_SIZES.md,
            radius: 'sm',
        },
    }),
}

export type ToggleButtonGroupIconItemRecipeVariants = NonNullable<
  RecipeVariants<typeof TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES.recipe>
>;
