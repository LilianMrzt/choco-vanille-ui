import { vars } from '@theme/contract.css.ts'
import { BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color

/**
 * Compound variants for the "contained" (solid) visual variant.
 * Every intent follows the same pattern: solid fill + Hover/Active states.
 */
export const containedCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.contained,
    (color) => ({
        backgroundColor: vars.color[color],
        color: vars.color[`${color}Foreground` as ColorVarKey],
        selectors: {
            '&:hover': {
                backgroundColor: vars.color[`${color}Hover` as ColorVarKey],
            },
            '&:active': {
                backgroundColor: vars.color[`${color}Active` as ColorVarKey],
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[`${color}Active` as ColorVarKey],
            },
            '&[data-active="true"]:hover': {
                backgroundColor: vars.color[`${color}Hover` as ColorVarKey],
            },
            '&[data-active="true"]:active': {
                backgroundColor: vars.color[`${color}Active` as ColorVarKey],
            },
        },
    }),
)
