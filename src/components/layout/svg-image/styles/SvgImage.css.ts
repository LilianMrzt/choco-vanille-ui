import { recipe } from '@vanilla-extract/recipes'

import { IMAGE_STYLES } from '@components/layout/image/styles/Image.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

export const SVG_IMAGE_STYLES = {
    recipe: IMAGE_STYLES.recipe,
    color: recipe({
        variants: {
            color: createColorVariants('color'),
        },
    }),
}
