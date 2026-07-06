import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { pulseAnimation } from '@constants/animations'
import { vars } from '@theme/contract.css.ts'

export const SKELETON_STYLES = {
    recipe: recipe({
        base: {
            backgroundColor: vars.color.skeleton,
            animation: `${pulseAnimation} 2s ${vars.easing.linear} infinite`,
        },
        variants: {
            variant: {
                circular: {
                    borderRadius: vars.radius.full,
                    flexShrink: 0,
                },
                rectangular: {
                    borderRadius: vars.radius.none,
                    flexShrink: 0,
                },
                rounded: {
                    borderRadius: vars.radius.md,
                    flexShrink: 0,
                },
            },
        },
        defaultVariants: {
            variant: 'rounded',
        },
    }),
}

export type SkeletonRecipeVariants = NonNullable<RecipeVariants<typeof SKELETON_STYLES.recipe>>
