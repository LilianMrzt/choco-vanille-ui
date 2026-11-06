import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    BUTTON_COLORS_ARRAY,
    BUTTON_COLORS,
    BUTTON_SIZES,
} from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

const pressedSelector = '&[data-pressed]'
const subtleCompoundVariants = BUTTON_COLORS_ARRAY.flatMap((color) =>
    (['ghostSubtle', 'outlinedSubtle'] as const).map((variant) => ({
        variants: { variant, color },
        style: {
            borderColor: variant === 'outlinedSubtle'
                ? vars.color.border.main
                : 'transparent',
            color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
            selectors: {
                '&:hover': {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
                    borderColor: variant === 'outlinedSubtle'
                        ? vars.color[COLOR_INTENT_TOKENS[color]].border
                        : 'transparent',
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
                '&:active': {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
                    borderColor: variant === 'outlinedSubtle'
                        ? vars.color[COLOR_INTENT_TOKENS[color]].border
                        : 'transparent',
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
                [pressedSelector]: {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                    borderColor: variant === 'outlinedSubtle'
                        ? vars.color[COLOR_INTENT_TOKENS[color]].border
                        : 'transparent',
                },
                [`${pressedSelector}:hover`]: {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
                [`${pressedSelector}:active`]: {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
            },
        },
    })),
)

export const TOGGLE_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            gap: vars.space[8],
            whiteSpace: 'nowrap',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: vars.color.surface.mutedForeground,
            fontWeight: vars.fontWeight.medium,
            selectors: {
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
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
                    borderColor: vars.color.border.main,
                },
                ghost: {
                    borderColor: 'transparent',
                },
                outlinedSubtle: {
                    borderColor: vars.color.border.main,
                    backgroundColor: 'transparent',
                },
                ghostSubtle: {
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                },
            },
            color: {
                [BUTTON_COLORS.primary]: {
                    color: vars.color.primary.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.primary.subtleForeground,
                            backgroundColor: vars.color.primary.subtle,
                        },
                        '&:active': {
                            color: vars.color.primary.subtleForeground,
                            backgroundColor: vars.color.primary.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.primary.main,
                            color: vars.color.primary.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.primary.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.primary.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.secondary]: {
                    color: vars.color.secondary.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.secondary.subtleForeground,
                            backgroundColor: vars.color.secondary.subtle,
                        },
                        '&:active': {
                            color: vars.color.secondary.subtleForeground,
                            backgroundColor: vars.color.secondary.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.secondary.main,
                            color: vars.color.secondary.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.secondary.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.secondary.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.tertiary]: {
                    color: vars.color.neutral.foreground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.neutral.foreground,
                            backgroundColor: vars.color.neutral.subtle,
                        },
                        '&:active': {
                            color: vars.color.neutral.foreground,
                            backgroundColor: vars.color.neutral.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.neutral.main,
                            color: vars.color.neutral.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.neutral.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.neutral.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.destructive]: {
                    color: vars.color.danger.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.danger.subtleForeground,
                            backgroundColor: vars.color.danger.subtle,
                        },
                        '&:active': {
                            color: vars.color.danger.subtleForeground,
                            backgroundColor: vars.color.danger.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.danger.main,
                            color: vars.color.danger.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.danger.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.danger.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.success]: {
                    color: vars.color.success.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.success.subtleForeground,
                            backgroundColor: vars.color.success.subtle,
                        },
                        '&:active': {
                            color: vars.color.success.subtleForeground,
                            backgroundColor: vars.color.success.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.success.main,
                            color: vars.color.success.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.success.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.success.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.warning]: {
                    color: vars.color.warning.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.warning.subtleForeground,
                            backgroundColor: vars.color.warning.subtle,
                        },
                        '&:active': {
                            color: vars.color.warning.subtleForeground,
                            backgroundColor: vars.color.warning.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.warning.main,
                            color: vars.color.warning.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.warning.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.warning.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.info]: {
                    color: vars.color.info.subtleForeground,
                    selectors: {
                        '&:hover': {
                            color: vars.color.info.subtleForeground,
                            backgroundColor: vars.color.info.subtle,
                        },
                        '&:active': {
                            color: vars.color.info.subtleForeground,
                            backgroundColor: vars.color.info.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.info.main,
                            color: vars.color.info.foreground,
                        },
                        [`${pressedSelector}:hover`]: {
                            backgroundColor: vars.color.info.hover,
                        },
                        [`${pressedSelector}:active`]: {
                            backgroundColor: vars.color.info.pressed,
                        },
                    },
                },
            },
            size: {
                [BUTTON_SIZES.sm]: {
                    height: '2.25rem',
                    paddingInline: vars.space[12],
                },
                [BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    paddingInline: vars.space[16],
                },
                [BUTTON_SIZES.lg]: {
                    height: '2.75rem',
                    paddingInline: vars.space[32],
                },
            },
            radius: {
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
            },
        },
        compoundVariants: subtleCompoundVariants,
        defaultVariants: {
            variant: 'ghostSubtle',
            color: BUTTON_COLORS.primary,
            size: BUTTON_SIZES.md,
            radius: 6,
        },
    }),
}
