import { recipe } from '@vanilla-extract/recipes'

const fallbackRecipe = recipe({
    base: {
        borderRadius: 'inherit',
    },
    variants: {},
})

/** Inherited fallback rounding classes for Avatar.Fallback customization. */
export const AVATAR_FALLBACK_STYLES = {
    recipe: fallbackRecipe,
}
