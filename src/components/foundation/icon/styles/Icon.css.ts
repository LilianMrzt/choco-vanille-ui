import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { spinAnimation } from '@constants/animations'

export const ICON_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-block',
            flexShrink: 0,
            verticalAlign: 'middle',
        },
        variants: {
            size: {
                xs:    { width: vars.fontSize[12],       height: vars.fontSize[12] },       // 12px
                sm:    { width: vars.fontSize[14],       height: vars.fontSize[14] },       // 14px
                md:    { width: vars.fontSize[16],       height: vars.fontSize[16] },       // 16px
                lg:    { width: vars.fontSize[20],       height: vars.fontSize[20] },       // 20px
                xl:    { width: vars.fontSize[24],   height: vars.fontSize[24] },   // 24px
                '2xl': { width: vars.fontSize[36],   height: vars.fontSize[36] },   // 36px
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
    }),
}

export type IconRecipeVariants = NonNullable<RecipeVariants<typeof ICON_STYLES.recipe>>
