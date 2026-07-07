import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'

export const BUTTON_STYLES = {
    recipe: recipe({
        base: {
            ...BUTTON_SHARED_STYLES.base,
            gap: vars.space.sm,
            whiteSpace: 'nowrap',
        },
        variants: {
            variant: BUTTON_SHARED_STYLES.variantVariants,
            color: BUTTON_SHARED_STYLES.colorVariants,
            size: {
                sm: {
                    height: '2.25rem',
                    paddingInline: vars.space.md,
                },
                md: {
                    height: '2.5rem',
                    paddingInline: vars.space.lg,
                },
                lg: {
                    height: '2.75rem',
                    paddingInline: vars.space['2xl'],
                },
            },
        },
        compoundVariants: BUTTON_SHARED_STYLES.compoundVariants,
        defaultVariants: BUTTON_SHARED_STYLES.defaultVariants,
    }),
}

export type ButtonRecipeVariants = NonNullable<RecipeVariants<typeof BUTTON_STYLES.recipe>>
