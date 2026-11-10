import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    BUTTON_COLORS_ARRAY,
    BUTTON_COLORS,
    BUTTON_SIZES,
} from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { BUTTON_SHARED_SIZE_STYLES } from '@components/actions/_shared/buttons/styles/ButtonSharedSizes.css'

const radiusVariants = styleVariants(vars.radius, (borderRadius) => ({
    borderRadius,
}))

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
                '&:hover:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
                    borderColor: variant === 'outlinedSubtle'
                        ? vars.color[COLOR_INTENT_TOKENS[color]].border
                        : 'transparent',
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
                '&:active:not(:disabled):not([aria-disabled="true"])': {
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
                [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                    backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
                    color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
                },
                [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
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
                '&:disabled, &[aria-disabled="true"]': {
                    cursor: 'not-allowed',
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
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.primary.subtleForeground,
                            backgroundColor: vars.color.primary.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.primary.subtleForeground,
                            backgroundColor: vars.color.primary.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.primary.main,
                            color: vars.color.primary.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.primary.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.primary.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.secondary]: {
                    color: vars.color.secondary.subtleForeground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.secondary.subtleForeground,
                            backgroundColor: vars.color.secondary.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.secondary.subtleForeground,
                            backgroundColor: vars.color.secondary.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.secondary.main,
                            color: vars.color.secondary.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.secondary.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.secondary.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.neutral]: {
                    color: vars.color.neutral.foreground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.neutral.foreground,
                            backgroundColor: vars.color.neutral.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.neutral.foreground,
                            backgroundColor: vars.color.neutral.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.neutral.main,
                            color: vars.color.neutral.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.neutral.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.neutral.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.danger]: {
                    color: vars.color.danger.subtleForeground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.danger.subtleForeground,
                            backgroundColor: vars.color.danger.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.danger.subtleForeground,
                            backgroundColor: vars.color.danger.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.danger.main,
                            color: vars.color.danger.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.danger.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.danger.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.success]: {
                    color: vars.color.success.subtleForeground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.success.subtleForeground,
                            backgroundColor: vars.color.success.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.success.subtleForeground,
                            backgroundColor: vars.color.success.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.success.main,
                            color: vars.color.success.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.success.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.success.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.warning]: {
                    color: vars.color.warning.subtleForeground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.warning.subtleForeground,
                            backgroundColor: vars.color.warning.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.warning.subtleForeground,
                            backgroundColor: vars.color.warning.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.warning.main,
                            color: vars.color.warning.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.warning.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.warning.pressed,
                        },
                    },
                },
                [BUTTON_COLORS.info]: {
                    color: vars.color.info.subtleForeground,
                    selectors: {
                        '&:hover:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.info.subtleForeground,
                            backgroundColor: vars.color.info.subtle,
                        },
                        '&:active:not(:disabled):not([aria-disabled="true"])': {
                            color: vars.color.info.subtleForeground,
                            backgroundColor: vars.color.info.subtlePressed,
                        },
                        [pressedSelector]: {
                            backgroundColor: vars.color.info.main,
                            color: vars.color.info.foreground,
                        },
                        [`${pressedSelector}:hover:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.info.hover,
                        },
                        [`${pressedSelector}:active:not(:disabled):not([aria-disabled="true"])`]: {
                            backgroundColor: vars.color.info.pressed,
                        },
                    },
                },
            },
            size: BUTTON_SHARED_SIZE_STYLES,
            radius: radiusVariants,
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
