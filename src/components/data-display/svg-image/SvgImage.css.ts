import { recipe } from '@vanilla-extract/recipes'

import { IMAGE_STYLES } from '@components/data-display/image/Image.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const localSvgImageColor = recipe({
    variants: {
        color: createColorVariants('color'),
    },
})

export const SVG_IMAGE_STYLES = {
    recipe: IMAGE_STYLES.recipe,
    color: localSvgImageColor,
}
