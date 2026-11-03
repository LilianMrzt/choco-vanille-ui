import { recipe } from '@vanilla-extract/recipes'

import { pulseAnimation } from '@constants/animations'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const SKELETON_STYLES = {
    recipe: recipe({
        base: {
            backgroundColor: vars.color.skeleton.base,
            animation: `${pulseAnimation} 2s ${vars.easing.linear} infinite`,
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
    }),
}
