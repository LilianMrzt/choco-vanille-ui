import { style, globalStyle } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/tokens.css.ts'

/*
 * Button styles — Vanilla Extract recipe.
 *
 * `recipe()` is the kit's replacement for `cva`: it returns a function
 * `buttonRecipe({ variant, size })` that produces a scoped class name, so the
 * hook/component API is unchanged. Every value is pulled from the design
 * tokens (`vars`), making the Button fully themeable.
 */

// Auto-size any SVG icon placed inside the button (child selectors require globalStyle).
const iconReset = style({})
globalStyle(`${iconReset} svg`, {
    pointerEvents: 'none',
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    flexShrink: 0,
})

export const buttonRecipe = recipe({
    base: [
        iconReset,
        {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: vars.space.sm,
            whiteSpace: 'nowrap',
            borderRadius: vars.radius.sm,
            border: '1px solid transparent',
            cursor: 'pointer',
            fontFamily: vars.fontFamily.sans,
            transition:
                'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, filter 0.15s ease',
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
    ],

    variants: {
        variant: {
            default: {
                backgroundColor: vars.color.primary,
                color: vars.color.primaryForeground,
                selectors: {
                    '&:hover': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.primary} 90%, transparent)`,
                    },
                    '&:active': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.primary} 80%, transparent)`,
                    },
                },
            },
            destructive: {
                backgroundColor: vars.color.destructive,
                color: vars.color.destructiveForeground,
                selectors: {
                    '&:hover': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.destructive} 90%, transparent)`,
                    },
                    '&:active': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.destructive} 80%, transparent)`,
                    },
                },
            },
            outline: {
                backgroundColor: vars.color.background,
                color: vars.color.foreground,
                borderColor: vars.color.input,
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.accent,
                        color: vars.color.accentForeground,
                    },
                    '&:active': {
                        backgroundColor: vars.color.accent,
                        color: vars.color.accentForeground,
                        filter: 'brightness(0.75)',
                    },
                },
            },
            secondary: {
                backgroundColor: vars.color.secondary,
                color: vars.color.secondaryForeground,
                selectors: {
                    '&:hover': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.secondary} 80%, transparent)`,
                    },
                    '&:active': {
                        backgroundColor: `color-mix(in oklab, ${vars.color.secondary} 60%, transparent)`,
                    },
                },
            },
            ghost: {
                backgroundColor: 'transparent',
                color: vars.color.foreground,
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.accent,
                        color: vars.color.accentForeground,
                    },
                    '&:active': {
                        backgroundColor: vars.color.accent,
                        color: vars.color.accentForeground,
                        filter: 'brightness(0.75)',
                    },
                },
            },
        },

        size: {
            default: {
                height: '2.5rem',
                paddingInline: vars.space.lg,
                paddingBlock: vars.space.sm,
            },
            sm: {
                height: '2.25rem',
                paddingInline: vars.space.md,
            },
            lg: {
                height: '2.75rem',
                paddingInline: vars.space['2xl'],
            },
            icon: {
                height: '2.5rem',
                width: '2.5rem',
            },
        },
    },

    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export type ButtonRecipeVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>
