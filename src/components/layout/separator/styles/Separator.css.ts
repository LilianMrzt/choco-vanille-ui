import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const SEPARATOR_STYLES = {
    recipe: recipe({
        base: {
            flexShrink: 0,
            backgroundColor: vars.color.border,
        },

        variants: {
            orientation: {
                horizontal: {
                    width: '100%',
                    height: '1px',
                },
                vertical: {
                    width: '1px',
                    height: '100%',
                },
            },
        },

        defaultVariants: {
            orientation: 'horizontal',
        },
    }),
}

export type SeparatorRecipeVariants = NonNullable<
  RecipeVariants<typeof SEPARATOR_STYLES.recipe>
>;
