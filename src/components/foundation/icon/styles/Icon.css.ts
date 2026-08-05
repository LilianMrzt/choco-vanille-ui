import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { spinAnimation } from '@constants/animations'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const colorVariants = createColorVariants('color')

export const ICON_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-block',
            flexShrink: 0,
            verticalAlign: 'middle',
        },
        variants: {
            size: {
                xs:    { width: vars.fontSize.xs,       height: vars.fontSize.xs },       // 12px
                sm:    { width: vars.fontSize.sm,       height: vars.fontSize.sm },       // 14px
                md:    { width: vars.fontSize.md,       height: vars.fontSize.md },       // 16px
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
        },
        defaultVariants: {
            size: 'md',
        },
    }),
}

export type IconRecipeVariants = NonNullable<RecipeVariants<typeof ICON_STYLES.recipe>>
