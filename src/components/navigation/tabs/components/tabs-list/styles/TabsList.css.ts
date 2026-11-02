import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABS_LIST_STYLES = {
    recipe: recipe({
        base: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        variants: {
            variant: {
                default: {
                    gap: vars.space.none,
                },
                pills: {
                    gap: vars.space.xxs,
                    padding: vars.space.xxs,
                    borderRadius: vars.radius.full,
                },
            },
            bordered: {
                true: {},
                false: {},
            },
        },

        compoundVariants: [
            {
                variants: { variant: 'default', bordered: true },
                style: {
                    borderBottom: `1px solid ${vars.color.border}`,
                },
            },
        ],

        defaultVariants: {
            variant: 'default',
            bordered: false,
        },
    }),
}

export type TabsListRecipeVariants = NonNullable<RecipeVariants<typeof TABS_LIST_STYLES.recipe>>
