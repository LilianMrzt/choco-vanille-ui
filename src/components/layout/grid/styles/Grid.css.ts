import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const GRID_STYLES = {
    recipe: recipe({
        base: {
            display: 'grid',
        },

        variants: {},
    }),
}

export type GridRecipeVariants = NonNullable<RecipeVariants<typeof GRID_STYLES.recipe>>
