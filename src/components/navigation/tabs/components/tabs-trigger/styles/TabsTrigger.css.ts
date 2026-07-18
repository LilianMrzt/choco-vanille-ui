import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const TABS_TRIGGER_STYLES = {
    recipe: recipe({
        base: {
            flex: '0 0 auto',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: vars.space.xs,
            padding: `${vars.space.xs2} ${vars.space.md}`,
            border: 'none',
            backgroundColor: 'transparent',
            color: vars.color.mutedForeground,
            fontFamily: 'inherit',
            fontSize: vars.fontSize.sm,
            fontWeight: vars.fontWeight.medium,
            lineHeight: vars.lineHeight.normal,
            cursor: 'pointer',
            outline: 'none',
            transition: [
                `color ${vars.duration.normal} ${vars.easing.standard}`,
                `background-color ${vars.duration.normal} ${vars.easing.standard}`,
                `border-color ${vars.duration.normal} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.normal} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                },
                '&[data-disabled]': {
                    cursor: 'not-allowed',
                    opacity: 0.5,
                },
            },
        },

        variants: {
            variant: {
                default: {
                    marginBottom: '-1px',
                    borderBottom: `2px solid transparent`,
                    borderRadius: `${vars.radius.sm} ${vars.radius.sm} 0 0`,
                    selectors: {
                        '&:not([data-disabled]):not([data-active]):hover': {
                            backgroundColor: vars.color.primarySubtle,
                            color: vars.color.foreground,
                        },
                        '&:not([data-disabled]):not([data-active]):active': {
                            backgroundColor: vars.color.primarySubtleActive,
                            color: vars.color.foreground,
                        },
                        '&[data-active]': {
                            borderBottomColor: vars.color.primary,
                            color: vars.color.primary,
                        },
                        '&[data-active][data-disabled]': {
                            borderBottomColor: vars.color.primary,
                            color: vars.color.primary,
                        },
                    },
                },
                pills: {
                    borderRadius: vars.radius.sm,
                    selectors: {
                        '&:not([data-disabled]):not([data-active]):hover': {
                            backgroundColor: vars.color.primarySubtle,
                            color: vars.color.foreground,
                        },
                        '&:not([data-disabled]):not([data-active]):active': {
                            backgroundColor: vars.color.primarySubtleActive,
                            color: vars.color.foreground,
                        },
                        '&[data-active]': {
                            backgroundColor: vars.color.primary,
                            color: vars.color.primaryForeground,
                        },
                        '&:not([data-disabled])[data-active]:hover': {
                            backgroundColor: vars.color.primaryHover,
                            color: vars.color.primaryForeground,
                        },
                        '&:not([data-disabled])[data-active]:active': {
                            backgroundColor: vars.color.primaryActive,
                            color: vars.color.primaryForeground,
                        },
                        '&[data-active][data-disabled]': {
                            backgroundColor: vars.color.primary,
                            color: vars.color.primaryForeground,
                        },
                    },
                },
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    }),
}

export const tabsTriggerLabel = style({
    fontWeight: vars.fontWeight.medium,
    selectors: {
        '[data-active] &': {
            fontWeight: vars.fontWeight.semibold,
        },
    },
})

export type TabsTriggerRecipeVariants = NonNullable<RecipeVariants<typeof TABS_TRIGGER_STYLES.recipe>>
