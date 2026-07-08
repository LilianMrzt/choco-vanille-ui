import { recipe } from '@vanilla-extract/recipes'

export const AVATAR_IMAGE_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
        },
        variants: {},
    }),
}
