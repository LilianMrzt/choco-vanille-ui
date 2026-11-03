import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    DRAWER_ITEM_COLORS,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants'
import { defaultCompoundVariants } from '@components/overlay/drawer/components/items/_shared/styles/variants/default.ts'
import { outlinedCompoundVariants } from '@components/overlay/drawer/components/items/_shared/styles/variants/outlined.ts'

const content = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'inherit',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="closed"]': {
            opacity: 0,
            pointerEvents: 'none',
        },
    },
})

const drawerItemRecipe = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: vars.space[12],
        width: '100%',
        minWidth: 0,
        flexShrink: 0,
        height: '2.25rem',
        paddingInline: vars.space[10],
        border: '1px solid transparent',
        borderRadius: vars.radius[4],
        backgroundColor: 'transparent',
        color: vars.color.text.secondary,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.25',
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
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
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
            '&[data-mode="mini"][data-state="closed"]': {
                opacity: 1,
                transform: 'none',
            },
        },
    },
    variants: {
        variant: {
            [DRAWER_ITEM_VARIANTS.default]: {},
            [DRAWER_ITEM_VARIANTS.outlined]: {},
        },
        color: {
            [DRAWER_ITEM_COLORS.primary]: {},
            [DRAWER_ITEM_COLORS.secondary]: {},
            [DRAWER_ITEM_COLORS.tertiary]: {},
            [DRAWER_ITEM_COLORS.destructive]: {},
            [DRAWER_ITEM_COLORS.success]: {},
            [DRAWER_ITEM_COLORS.warning]: {},
            [DRAWER_ITEM_COLORS.info]: {},
        },
    },
    compoundVariants: [
        ...defaultCompoundVariants,
        ...outlinedCompoundVariants,
    ],
    defaultVariants: {
        variant: DRAWER_ITEM_VARIANTS.default,
        color: DRAWER_ITEM_COLORS.primary,
    },
})

export const DRAWER_ITEM_STYLES = {
    recipe: drawerItemRecipe,
    content,
}

export type DrawerItemRecipeVariants = NonNullable<
  RecipeVariants<typeof drawerItemRecipe>
>;
