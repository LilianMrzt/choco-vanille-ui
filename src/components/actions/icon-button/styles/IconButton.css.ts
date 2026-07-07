import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { ICON_BUTTON_SIZES } from '@components/actions/icon-button/constants'

export const ICON_BUTTON_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            flexShrink: 0,
        },

        variants: {
            variant: BUTTON_SHARED_STYLES.variantVariants,
            color: BUTTON_SHARED_STYLES.colorVariants,
            size: {
                [ICON_BUTTON_SIZES.xs]: {
                    height: '2rem',
                    width: '2rem',
                },
                [ICON_BUTTON_SIZES.sm]: {
                    height: '2.25rem',
                    width: '2.25rem',
                },
                [ICON_BUTTON_SIZES.md]: {
                    height: '2.5rem',
                    width: '2.5rem',
                },
                [ICON_BUTTON_SIZES.lg]: {
                    height: '2.75rem',
                    width: '2.75rem',
                },
            },
        },

        compoundVariants: BUTTON_SHARED_STYLES.compoundVariants,
        defaultVariants: BUTTON_SHARED_STYLES.defaultVariants,
    }),
}

export type IconButtonRecipeVariants = NonNullable<RecipeVariants<typeof ICON_BUTTON_STYLES.recipe>>
