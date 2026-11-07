import { recipe } from '@vanilla-extract/recipes'

import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { BUTTON_SHARED_SIZE_STYLES } from '@components/actions/_shared/buttons/styles/ButtonSharedSizes.css'

const buttonRecipe = recipe({
    base: {
        ...BUTTON_SHARED_STYLES.base,
        whiteSpace: 'nowrap',
    },
    variants: {
        variant: BUTTON_SHARED_STYLES.variantVariants,
        color: BUTTON_SHARED_STYLES.colorVariants,
        size: BUTTON_SHARED_SIZE_STYLES,
    },
    compoundVariants: BUTTON_SHARED_STYLES.compoundVariants,
    defaultVariants: BUTTON_SHARED_STYLES.defaultVariants,
})

/** Customizable button recipe. */
export const BUTTON_STYLES = {
    recipe: buttonRecipe,
}
