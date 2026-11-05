import { recipe } from '@vanilla-extract/recipes'

const imageRecipe = recipe({
    base: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
    },
    variants: {},
})

/** Image fill and cropping classes; consumer classes and styles remain supported. */
export const AVATAR_IMAGE_STYLES = {
    recipe: imageRecipe,
}
