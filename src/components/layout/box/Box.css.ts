import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import { styleVariants } from '@vanilla-extract/css'

const MARGIN_VARIANTS = {
    auto: 'auto',
    ...SPACE_VARIANTS,
} as const

const borderRadiusVariants = styleVariants(vars.radius, (borderRadius) => ({
    borderRadius,
}))

const paddingVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    padding: value,
}))

const paddingXVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingInline: value,
}))

const paddingYVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingBlock: value,
}))

const paddingTopVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingTop: value,
}))

const paddingRightVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingRight: value,
}))

const paddingBottomVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingBottom: value,
}))

const paddingLeftVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    paddingLeft: value,
}))

const marginVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    margin: value,
}))

const marginXVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginInline: value,
}))

const marginYVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginBlock: value,
}))

const marginTopVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginTop: value,
}))

const marginRightVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginRight: value,
}))

const marginBottomVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginBottom: value,
}))

const marginLeftVariants = styleVariants(MARGIN_VARIANTS, (value) => ({
    marginLeft: value,
}))

const gapVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    gap: value,
}))

const columnGapVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    columnGap: value,
}))

const rowGapVariants = styleVariants(SPACE_VARIANTS, (value) => ({
    rowGap: value,
}))

const boxShadowVariants = styleVariants(vars.shadow, (value) => ({
    boxShadow: value,
}))

const localBoxRecipe = recipe({
    base: {},

    variants: {
        // Border Radius
        borderRadius: borderRadiusVariants,

        // Padding
        padding: paddingVariants,

        paddingX: paddingXVariants,

        paddingY: paddingYVariants,

        paddingTop: paddingTopVariants,

        paddingRight: paddingRightVariants,

        paddingBottom: paddingBottomVariants,

        paddingLeft: paddingLeftVariants,

        // Margin
        margin: marginVariants,

        marginX: marginXVariants,

        marginY: marginYVariants,

        marginTop: marginTopVariants,

        marginRight: marginRightVariants,

        marginBottom: marginBottomVariants,

        marginLeft: marginLeftVariants,

        // Gap (for flex / grid children)
        gap: gapVariants,

        columnGap: columnGapVariants,

        rowGap: rowGapVariants,

        // Shadow
        boxShadow: boxShadowVariants,
    },
})

export const BOX_STYLES = {
    recipe: localBoxRecipe,
}
