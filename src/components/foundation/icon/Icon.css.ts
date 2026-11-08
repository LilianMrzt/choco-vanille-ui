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
            10: {
                width: vars.fontSize[10],
                height: vars.fontSize[10],
            },
            12: {
                width: vars.fontSize[12],
                height: vars.fontSize[12],
            },
            14: {
                width: vars.fontSize[14],
                height: vars.fontSize[14],
            },
            16: {
                width: vars.fontSize[16],
                height: vars.fontSize[16],
            },
            18: {
                width: vars.fontSize[18],
                height: vars.fontSize[18],
            },
            20: {
                width: vars.fontSize[20],
                height: vars.fontSize[20],
            },
            24: {
                width: vars.fontSize[24],
                height: vars.fontSize[24],
            },
            30: {
                width: vars.fontSize[30],
                height: vars.fontSize[30],
            },
            36: {
                width: vars.fontSize[36],
                height: vars.fontSize[36],
            },
            48: {
                width: vars.fontSize[48],
                height: vars.fontSize[48],
            },
            60: {
                width: vars.fontSize[60],
                height: vars.fontSize[60],
            },
            72: {
                width: vars.fontSize[72],
                height: vars.fontSize[72],
            },
        },
        spin: {
            true: {
                animation: `${spinAnimation} 1s linear infinite`,
            },
        },
    },
    defaultVariants: {
        size: 16,
    },
})

export const ICON_STYLES = {
    recipe: iconRecipe,
}
