import { recipe } from '@vanilla-extract/recipes'

import { pulseAnimation } from '@constants/animations'
import { vars } from '@theme/styles/contract/contract.css.ts'

const skeletonRecipe = recipe({
    base: {
        backgroundColor: vars.color.skeleton.base,
        animation: `${pulseAnimation} 2s ${vars.easing.linear} infinite`,
        '@media': {
            '(prefers-reduced-motion: reduce)': {
                animation: 'none',
            },
        },
    },
    variants: {
        variant: {
            circular: {
                borderRadius: vars.radius.full,
                flexShrink: 0,
            },
            rectangular: {
                borderRadius: vars.radius[0],
                flexShrink: 0,
            },
            rounded: {
                borderRadius: vars.radius[6],
                flexShrink: 0,
            },
        },
    },
    defaultVariants: {
        variant: 'rounded',
    },
})

export const SKELETON_STYLES = {
    recipe: skeletonRecipe,
}
