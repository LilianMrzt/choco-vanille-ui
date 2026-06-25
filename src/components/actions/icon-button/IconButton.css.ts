import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { iconReset, buttonBaseStyles, buttonVariantStyles } from '@components/actions/_shared/buttonShared.css.ts'

export const iconButtonRecipe = recipe({
    base: [
        iconReset,
        {
            ...buttonBaseStyles,
            flexShrink: 0,
        },
    ],

    variants: {
        variant: buttonVariantStyles,

        size: {
            sm: {
                height: '2.25rem',
                width: '2.25rem',
            },
            default: {
                height: '2.5rem',
                width: '2.5rem',
            },
            lg: {
                height: '2.75rem',
                width: '2.75rem',
            },
        },
    },

    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export type IconButtonRecipeVariants = NonNullable<RecipeVariants<typeof iconButtonRecipe>>
