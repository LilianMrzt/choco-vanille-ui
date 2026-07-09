import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

const backgroundColorVariants = createColorVariants('backgroundColor')

const panel = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
})

const size = {
    sm: style({ maxWidth: '16rem' }),
    md: style({ maxWidth: '20rem' }),
    lg: style({ maxWidth: '24rem' }),
    xl: style({ maxWidth: '28rem' }),
    '2xl': style({ maxWidth: '32rem' }),
    full: style({ maxWidth: '100%' }),
}

const recipeStyles = recipe({
    base: {},
    variants: {
        backgroundColor: backgroundColorVariants,
    },
})

export const DRAWER_STYLES = {
    panel,
    size,
    recipe: recipeStyles,
}

export type DrawerRecipeVariants = NonNullable<RecipeVariants<typeof recipeStyles>>
