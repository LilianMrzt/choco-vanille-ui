import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { spinAnimation } from '@constants/animations'

const iconRecipe = recipe({
    base: {
        display: 'inline-block',
        flexShrink: 0,
        verticalAlign: 'middle',
    },
    variants: {
        size: {
            xs: {
                width: vars.fontSize[12],
                height: vars.fontSize[12],
            },
            sm: {
                width: vars.fontSize[14],
                height: vars.fontSize[14],
            },
            md: {
                width: vars.fontSize[16],
                height: vars.fontSize[16],
            },
            lg: {
                width: vars.fontSize[20],
                height: vars.fontSize[20],
            },
            xl: {
                width: vars.fontSize[24],
                height: vars.fontSize[24],
            },
            '2xl': {
                width: vars.fontSize[36],
                height: vars.fontSize[36],
            },
        },
        spin: {
            true: {
                animation: `${spinAnimation} 1s linear infinite`,
            },
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

export const ICON_STYLES = {
    recipe: iconRecipe,
}
