import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const FLEX_STYLES = {
    recipe: recipe({
        base: {
            display: 'flex',
        },

        variants: {
            inline: {
                true: { display: 'inline-flex' },
            },
        },
    }),
}

export type FlexRecipeVariants = NonNullable<RecipeVariants<typeof FLEX_STYLES.recipe>>
