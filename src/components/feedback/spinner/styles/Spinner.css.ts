import { recipe } from '@vanilla-extract/recipes'

import { spinAnimation } from '@constants/animations'
import { SPINNER_COLORS_ARRAY } from '@components/feedback/spinner/constants'
import { vars } from '@theme/contract.css.ts'

const colorVariants = Object.fromEntries(
    SPINNER_COLORS_ARRAY.map((color) => [color, { color: vars.color[color] }]),
)

export const SPINNER_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-block',
            flexShrink: 0,
            border: '0.15em solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: vars.radius.full,
            animation: `${spinAnimation} 1s linear infinite`,
            '@media': {
                '(prefers-reduced-motion: reduce)': {
                    animation: 'none',
                },
            },
        },
        variants: {
            size: {
                xs: {
                    width: vars.fontSize.xs,
                    height: vars.fontSize.xs,
                },
                sm: {
                    width: vars.fontSize.sm,
                    height: vars.fontSize.sm,
                },
                md: {
                    width: vars.fontSize.base,
                    height: vars.fontSize.base,
                },
                lg: {
                    width: vars.fontSize.xl,
                    height: vars.fontSize.xl,
                },
                xl: {
                    width: vars.fontSize['2xl'],
                    height: vars.fontSize['2xl'],
                },
            },
            color: colorVariants,
        },
        defaultVariants: {
            size: 'md',
            color: 'primary',
        },
    }),
}
