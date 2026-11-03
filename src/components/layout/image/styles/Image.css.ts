import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const IMAGE_STYLES = {
    recipe: recipe({
        base: {
            maxWidth: '100%',
            height: 'auto',
            flexShrink: 0
        },

        variants: {
            // Object Fit
            objectFit: {
                contain: { objectFit: 'contain' },
                cover: { objectFit: 'cover' },
                fill: { objectFit: 'fill' },
                none: { objectFit: 'none' },
                'scale-down': { objectFit: 'scale-down' },
            },

            // Object Position
            objectPosition: {
                center: { objectPosition: 'center' },
                top: { objectPosition: 'top' },
                bottom: { objectPosition: 'bottom' },
                left: { objectPosition: 'left' },
                right: { objectPosition: 'right' },
                'top-left': { objectPosition: 'left top' },
                'top-right': { objectPosition: 'right top' },
                'bottom-left': { objectPosition: 'left bottom' },
                'bottom-right': { objectPosition: 'right bottom' },
            },

            // Border Radius
            borderRadius: {
                0: {
                    borderRadius: vars.radius[0],
                },
                4: {
                    borderRadius: vars.radius[4],
                },
                6: {
                    borderRadius: vars.radius[6],
                },
                8: {
                    borderRadius: vars.radius[8],
                },
                10: {
                    borderRadius: vars.radius[10],
                },
                14: {
                    borderRadius: vars.radius[14],
                },
                20: {
                    borderRadius: vars.radius[20],
                },
                'full': {
                    borderRadius: vars.radius['full'],
                },
            },

            // Padding
            padding: {
                0: {
                    padding: vars.space[0],
                },
                1: {
                    padding: vars.space[1],
                },
                2: {
                    padding: vars.space[2],
                },
                4: {
                    padding: vars.space[4],
                },
                6: {
                    padding: vars.space[6],
                },
                8: {
                    padding: vars.space[8],
                },
                10: {
                    padding: vars.space[10],
                },
                12: {
                    padding: vars.space[12],
                },
                14: {
                    padding: vars.space[14],
                },
                16: {
                    padding: vars.space[16],
                },
                18: {
                    padding: vars.space[18],
                },
                20: {
                    padding: vars.space[20],
                },
                24: {
                    padding: vars.space[24],
                },
                28: {
                    padding: vars.space[28],
                },
                32: {
                    padding: vars.space[32],
                },
                48: {
                    padding: vars.space[48],
                },
                64: {
                    padding: vars.space[64],
                },
                80: {
                    padding: vars.space[80],
                },
                96: {
                    padding: vars.space[96],
                },
                112: {
                    padding: vars.space[112],
                },
                128: {
                    padding: vars.space[128],
                },
            },

            // Margin
            margin: {
                'auto': {
                    margin: 'auto',
                },
                0: {
                    margin: vars.space[0],
                },
                1: {
                    margin: vars.space[1],
                },
                2: {
                    margin: vars.space[2],
                },
                4: {
                    margin: vars.space[4],
                },
                6: {
                    margin: vars.space[6],
                },
                8: {
                    margin: vars.space[8],
                },
                10: {
                    margin: vars.space[10],
                },
                12: {
                    margin: vars.space[12],
                },
                14: {
                    margin: vars.space[14],
                },
                16: {
                    margin: vars.space[16],
                },
                18: {
                    margin: vars.space[18],
                },
                20: {
                    margin: vars.space[20],
                },
                24: {
                    margin: vars.space[24],
                },
                28: {
                    margin: vars.space[28],
                },
                32: {
                    margin: vars.space[32],
                },
                48: {
                    margin: vars.space[48],
                },
                64: {
                    margin: vars.space[64],
                },
                80: {
                    margin: vars.space[80],
                },
                96: {
                    margin: vars.space[96],
                },
                112: {
                    margin: vars.space[112],
                },
                128: {
                    margin: vars.space[128],
                },
            },

        },
    }),
}
