import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { SEPARATOR_ORIENTATIONS } from '@components/layout/separator/constants/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const colorVariants = createColorVariants('color')

export const SEPARATOR_STYLES = {
    line: style({
        flex: 1,
        minWidth: 0,
        backgroundColor: 'currentColor',
    }),

    horizontalLine: style({
        height: '1px',
    }),

    verticalLine: style({
        width: '1px',
    }),

    recipe: recipe({
        base: {
            flexShrink: 0,
            backgroundColor: 'currentColor',
            color: vars.color.border.main,
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
            hasLabel: {
                true: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: vars.space.md,
                    backgroundColor: 'transparent',
                },
                false: {},
            },
        },

        compoundVariants: [
            {
                variants: {
                    orientation: SEPARATOR_ORIENTATIONS.horizontal,
                    hasLabel: true,
                },
                style: {
                    height: 'auto',
                },
            },
            {
                variants: {
                    orientation: SEPARATOR_ORIENTATIONS.vertical,
                    hasLabel: true,
                },
                style: {
                    flexDirection: 'column',
                    width: 'auto',
                },
            },
        ],

        defaultVariants: {
            orientation: SEPARATOR_ORIENTATIONS.horizontal,
        },
    }),
}
