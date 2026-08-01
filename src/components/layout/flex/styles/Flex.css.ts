import { recipe } from '@vanilla-extract/recipes'

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
