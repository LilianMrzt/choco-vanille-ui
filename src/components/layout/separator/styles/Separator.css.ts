import { recipe } from '@vanilla-extract/recipes'

import { SEPARATOR_ORIENTATIONS } from '@components/layout/separator/constants/index.ts'
import { vars } from '@theme/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const colorVariants = createColorVariants('backgroundColor')

export const SEPARATOR_STYLES = {
    recipe: recipe({
        base: {
            flexShrink: 0,
            backgroundColor: vars.color.border,
        },

        variants: {
            orientation: {
                [SEPARATOR_ORIENTATIONS.horizontal]: {
                    width: '100%',
                    height: '1px',
                },
                [SEPARATOR_ORIENTATIONS.vertical]: {
                    width: '1px',
                    height: '100%',
                },
            },

            color: colorVariants,
        },

        defaultVariants: {
            orientation: SEPARATOR_ORIENTATIONS.horizontal,
        },
    }),
}
