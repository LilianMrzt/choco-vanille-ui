import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const ACCORDION_ITEM_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
        },

        variants: {
            bordered: {
                true: {
                    borderBottom: `1px solid ${vars.color.border}`,
                    marginBlock: vars.space.xs,
                    paddingBlock: vars.space.xs,
                    ':last-child': {
                        borderBottom: 'none',
                    },
                },
                false: {
                    marginBlock: vars.space.xs,
                    paddingBlock: vars.space.xs,
                },
            },
        },

        defaultVariants: {
            bordered: true,
        },
    }),
}

export type AccordionItemRecipeVariants = NonNullable<RecipeVariants<typeof ACCORDION_ITEM_STYLES.recipe>>
