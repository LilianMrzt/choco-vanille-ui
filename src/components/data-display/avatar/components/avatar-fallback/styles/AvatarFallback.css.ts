import { recipe } from '@vanilla-extract/recipes'

export const AVATAR_FALLBACK_STYLES = {
    recipe: recipe({
        base: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
        },
        variants: {},
    }),
}
