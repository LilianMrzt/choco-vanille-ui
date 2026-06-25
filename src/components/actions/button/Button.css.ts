import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import {
    iconReset,
    buttonBaseStyles,
    sharedButtonVariantVariants,
    sharedButtonColorVariants,
    sharedButtonCompoundVariants,
    sharedButtonDefaultVariants,
} from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

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
        variant: sharedButtonVariantVariants,
        color: sharedButtonColorVariants,
        size: {
            sm: {
                height: '2.25rem',
                paddingInline: vars.space.md,
            },
            md: {
                height: '2.5rem',
                paddingInline: vars.space.lg,
                paddingBlock: vars.space.sm,
            },
            lg: {
                height: '2.75rem',
                paddingInline: vars.space['2xl'],
            },
        },
    },
    compoundVariants: sharedButtonCompoundVariants,
    defaultVariants: sharedButtonDefaultVariants,
})

export type ButtonRecipeVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>
