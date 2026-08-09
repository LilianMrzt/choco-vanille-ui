import { recipe } from '@vanilla-extract/recipes'

import { SEPARATOR_ORIENTATIONS } from '@components/layout/separator/constants/index.ts'
import { vars } from '@theme/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const colorVariants = createColorVariants('color')

export const SEPARATOR_STYLES = {
    recipe: recipe({
        base: {
            flexShrink: 0,
            backgroundColor: 'currentColor',
            color: vars.color.border,
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
                    gap: vars.space.md,
                    backgroundColor: 'transparent',
                    selectors: {
                        '&::before, &::after': {
                            content: '""',
                            flex: 1,
                            backgroundColor: 'currentColor',
                        },
                    },
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
                    selectors: {
                        '&::before, &::after': {
                            height: '1px',
                        },
                    },
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
                    selectors: {
                        '&::before, &::after': {
                            width: '1px',
                            height: 'auto',
                        },
                    },
                },
            },
        ],

        defaultVariants: {
            orientation: SEPARATOR_ORIENTATIONS.horizontal,
        },
    }),
}
