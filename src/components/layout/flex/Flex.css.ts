import { recipe } from '@vanilla-extract/recipes'

const localFlexRecipe = recipe({
    base: {
        display: 'flex',
    },

    variants: {
        inline: {
            true: {
                display: 'inline-flex',
            },
        },
    },
})

export const FLEX_STYLES = {
    recipe: localFlexRecipe,
}
