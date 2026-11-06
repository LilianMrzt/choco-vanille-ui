import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const ACCORDION_ITEM_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
        },

        variants: {
            bordered: {
                true: {
                    borderBottom: `1px solid ${vars.color.border.muted}`,
                    marginBlock: vars.space[4],
                    paddingBlock: vars.space[4],
                    ':last-child': {
                        borderBottom: 'none',
                    },
                },
                false: {
                    marginBlock: vars.space[4],
                    paddingBlock: vars.space[4],
                },
            },
        },

        defaultVariants: {
            bordered: true,
        },
    }),
}

export type AccordionItemRecipeVariants = NonNullable<RecipeVariants<typeof ACCORDION_ITEM_STYLES.recipe>>
