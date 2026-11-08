import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { BUTTON_SHARED_SIZE_STYLES } from '@components/actions/_shared/buttons/styles/ButtonSharedSizes.css.ts'

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
        ...BUTTON_SHARED_STYLES.base,
        ...BUTTON_SHARED_SIZE_STYLES.md,
        display: 'flex',
        justifyContent: 'start',
        width: '100%',
        minWidth: 0,
        flexShrink: 0,
        backgroundColor: 'transparent',
        color: vars.color.text.secondary,
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.25',
        textAlign: 'left',
        transform: 'translateX(0)',
        transition: [
            BUTTON_SHARED_STYLES.base.transition,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
            `opacity ${vars.duration.normal} ${vars.easing.standard}`,
            `transform ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            ...BUTTON_SHARED_STYLES.base.selectors,
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
                paddingInline: vars.space[10],
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
            [DRAWER_ITEM_COLORS.neutral]: {},
            [DRAWER_ITEM_COLORS.danger]: {},
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
