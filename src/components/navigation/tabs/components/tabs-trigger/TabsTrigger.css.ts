import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABS_TRIGGER_STYLES = {
    recipe: recipe({
        base: {
            flex: '0 0 auto',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: vars.space[4],
            padding: `${vars.space[6]} ${vars.space[12]}`,
            border: 'none',
            backgroundColor: 'transparent',
            color: vars.color.surface.mutedForeground,
            fontFamily: 'inherit',
            fontSize: vars.fontSize[14],
            fontWeight: vars.fontWeight.medium,
            lineHeight: '1.5',
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
                    // Inset so the ring is never clipped by scrolling/overflow ancestors
                    boxShadow: `inset 0 0 0 2px ${vars.color.focusRing}`,
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
                    borderRadius: `${vars.radius[4]} ${vars.radius[4]} 0 0`,
                    // Keep hover/active tint above the underline and list divider
                    backgroundClip: 'padding-box',
                    selectors: {
                        '&:not([data-disabled]):not([data-active]):hover': {
                            backgroundColor: vars.color.primary.subtle,
                            color: vars.color.text.primary,
                        },
                        '&:not([data-disabled]):not([data-active]):active': {
                            backgroundColor: vars.color.primary.subtlePressed,
                            color: vars.color.text.primary,
                        },
                        '&[data-active]': {
                            borderBottomColor: vars.color.primary.main,
                            color: vars.color.primary.main,
                        },
                        '&[data-active][data-disabled]': {
                            borderBottomColor: vars.color.primary.main,
                            color: vars.color.primary.main,
                        },
                    },
                },
                pills: {
                    borderRadius: vars.radius[4],
                    selectors: {
                        '&:not([data-disabled]):not([data-active]):hover': {
                            backgroundColor: vars.color.primary.subtle,
                            color: vars.color.text.primary,
                        },
                        '&:not([data-disabled]):not([data-active]):active': {
                            backgroundColor: vars.color.primary.subtlePressed,
                            color: vars.color.text.primary,
                        },
                        '&[data-active]': {
                            backgroundColor: vars.color.primary.main,
                            color: vars.color.primary.foreground,
                        },
                        '&:not([data-disabled])[data-active]:hover': {
                            backgroundColor: vars.color.primary.hover,
                            color: vars.color.primary.foreground,
                        },
                        '&:not([data-disabled])[data-active]:active': {
                            backgroundColor: vars.color.primary.pressed,
                            color: vars.color.primary.foreground,
                        },
                        '&[data-active][data-disabled]': {
                            backgroundColor: vars.color.primary.main,
                            color: vars.color.primary.foreground,
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
