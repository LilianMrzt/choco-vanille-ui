import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { iconReset, buttonBaseStyles, buttonVariantStyles } from '@components/actions/_shared/buttonShared.css.ts'

export const buttonRecipe = recipe({
    base: [
        iconReset,
        {
            ...buttonBaseStyles,
            gap: vars.space.sm,
            whiteSpace: 'nowrap',
        },
    ],
    variants: {
        variant: buttonVariantStyles,
        size: {
            default: {
                height: '2.5rem',
                paddingInline: vars.space.lg,
                paddingBlock: vars.space.sm,
            },
            sm: {
                height: '2.25rem',
                paddingInline: vars.space.md,
            },
            lg: {
                height: '2.75rem',
                paddingInline: vars.space['2xl'],
            },
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export type ButtonRecipeVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>
