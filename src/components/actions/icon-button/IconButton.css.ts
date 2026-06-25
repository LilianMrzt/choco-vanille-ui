import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import {
    iconReset,
    buttonBaseStyles,
    sharedButtonVariantVariants,
    sharedButtonColorVariants,
    sharedButtonCompoundVariants,
    sharedButtonDefaultVariants,
} from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

export const iconButtonRecipe = recipe({
    base: [
        iconReset,
        {
            ...buttonBaseStyles,
            flexShrink: 0,
        },
    ],

    variants: {
        variant: sharedButtonVariantVariants,
        color: sharedButtonColorVariants,
        size: {
            sm: {
                height: '2.25rem',
                width: '2.25rem',
            },
            md: {
                height: '2.5rem',
                width: '2.5rem',
            },
            lg: {
                height: '2.75rem',
                width: '2.75rem',
            },
        },
    },

    compoundVariants: sharedButtonCompoundVariants,
    defaultVariants: sharedButtonDefaultVariants,
})

export type IconButtonRecipeVariants = NonNullable<RecipeVariants<typeof iconButtonRecipe>>
