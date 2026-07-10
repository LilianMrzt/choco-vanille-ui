import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { spinAnimation } from '@constants/animations'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'

const colorVariants = createColorVariants('color')
const backgroundColorVariants = createColorVariants('background')
const borderColorVariants = createColorVariants('borderColor')

export const ICON_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-block',
            flexShrink: 0,
            verticalAlign: 'middle',
            fill: 'currentColor',
        },
        variants: {
            size: {
                xs:    { width: vars.fontSize.xs,       height: vars.fontSize.xs },       // 12px
                sm:    { width: vars.fontSize.sm,       height: vars.fontSize.sm },       // 14px
                md:    { width: vars.fontSize.base,     height: vars.fontSize.base },     // 16px
                lg:    { width: vars.fontSize.xl,       height: vars.fontSize.xl },       // 20px
                xl:    { width: vars.fontSize['2xl'],   height: vars.fontSize['2xl'] },   // 24px
                '2xl': { width: vars.fontSize['4xl'],   height: vars.fontSize['4xl'] },   // 36px
            },
            spin: {
                true: {
                    animation: `${spinAnimation} 1s linear infinite`,
                },
            },

            color: colorVariants,

            padding: {
                none: { padding: SPACE_VARIANTS.none },
                px: { padding: SPACE_VARIANTS.px },
                xxs: { padding: SPACE_VARIANTS.xxs },
                xs: { padding: SPACE_VARIANTS.xs },
                xs2: { padding: SPACE_VARIANTS.xs2 },
                sm: { padding: SPACE_VARIANTS.sm },
                md: { padding: SPACE_VARIANTS.md },
                lg: { padding: SPACE_VARIANTS.lg },
                xl: { padding: SPACE_VARIANTS.xl },
                '2xl': { padding: SPACE_VARIANTS['2xl'] },
                '3xl': { padding: SPACE_VARIANTS['3xl'] },
                '4xl': { padding: SPACE_VARIANTS['4xl'] },
                '5xl': { padding: SPACE_VARIANTS['5xl'] },
            },

            borderColor: borderColorVariants,

            backgroundColor: backgroundColorVariants,
        },
        defaultVariants: {
            size: 'md',
        },
    }),
}

export type IconRecipeVariants = NonNullable<RecipeVariants<typeof ICON_STYLES.recipe>>
