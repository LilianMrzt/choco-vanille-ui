import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { ICON_BUTTON_SIZE_VARIANTS } from '@components/actions/icon-button/constants/iconButtonSizeVariants.const.ts'

export const ICON_BUTTON_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            flexShrink: 0,
        },

        variants: {
            variant: BUTTON_SHARED_STYLES.variantVariants,
            color: BUTTON_SHARED_STYLES.colorVariants,
            size: ICON_BUTTON_SIZE_VARIANTS,
        },

        compoundVariants: BUTTON_SHARED_STYLES.compoundVariants,
        defaultVariants: BUTTON_SHARED_STYLES.defaultVariants,
    }),
}

export type IconButtonRecipeVariants = NonNullable<RecipeVariants<typeof ICON_BUTTON_STYLES.recipe>>
