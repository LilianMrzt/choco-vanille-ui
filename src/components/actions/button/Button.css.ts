import { style, globalStyle } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

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
            transition: [
                `background-color ${vars.duration.normal} ${vars.easing.standard}`,
                `color ${vars.duration.normal} ${vars.easing.standard}`,
                `border-color ${vars.duration.normal} ${vars.easing.standard}`,
                `filter ${vars.duration.normal} ${vars.easing.standard}`,
            ].join(', '),
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
                        backgroundColor: vars.color.primaryHover,
                    },
                    '&:active': {
                        backgroundColor: vars.color.primaryActive,
                    },
                },
            },
            destructive: {
                backgroundColor: vars.color.destructive,
                color: vars.color.destructiveForeground,
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.destructiveHover,
                    },
                    '&:active': {
                        backgroundColor: vars.color.destructiveActive,
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
                        backgroundColor: vars.color.secondaryHover,
                    },
                    '&:active': {
                        backgroundColor: vars.color.secondaryActive,
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
