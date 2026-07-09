import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

const drawerItemRecipe = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.md,
        width: '100%',
        minWidth: 0,
        paddingInline: vars.space.md,
        paddingBlock: vars.space.sm,
        border: '1px solid transparent',
        borderRadius: vars.radius.md,
        backgroundColor: 'transparent',
        color: vars.color.textSecondary,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.tight,
        textAlign: 'left',
        textDecoration: 'none',
        cursor: 'pointer',
        transform: 'translateX(0)',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
            `opacity ${vars.duration.normal} ${vars.easing.standard}`,
            `transform ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:hover': {
                backgroundColor: vars.color.muted,
                color: vars.color.text,
            },
            '&:active': {
                backgroundColor: vars.color.secondarySubtleActive,
                color: vars.color.text,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color.card,
                color: vars.color.text,
                borderColor: vars.color.border,
            },
            '&[aria-expanded="true"]': {
                backgroundColor: vars.color.secondarySubtle,
                color: vars.color.secondarySubtleForeground,
            },
            '&[aria-disabled="true"], &:disabled': {
                pointerEvents: 'none',
                opacity: 0.5,
            },
            '&[data-state="closed"]': {
                opacity: 0,
                transform: 'translateX(-0.5rem)',
            },
            '&[data-state="closed"][data-position="right"]': {
                transform: 'translateX(0.5rem)',
            },
        },
    },
    variants: {
        size: {
            sm: {
                paddingInline: vars.space.sm,
                paddingBlock: vars.space.xs,
                gap: vars.space.sm,
                fontSize: vars.fontSize.xs,
            },
            md: {},
            lg: {
                paddingInline: vars.space.lg,
                paddingBlock: vars.space.md,
                gap: vars.space.lg,
                fontSize: vars.fontSize.base,
            },
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

const icon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
})

const endIcon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
    transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="closed"]': {
            opacity: 0,
        },
    },
})

export const DRAWER_ITEM_STYLES = {
    recipe: drawerItemRecipe,
    icon,
    endIcon,
}

export type DrawerItemRecipeVariants = NonNullable<
  RecipeVariants<typeof drawerItemRecipe>
>;
