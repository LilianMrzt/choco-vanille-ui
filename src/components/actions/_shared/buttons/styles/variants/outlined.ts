import { vars } from '@theme/contract.css.ts'
import { BUTTON_COLORS, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color

/**
 * Compound variants for the "outlined" visual variant.
 */
export const outlinedCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.outlined,
    (color) => ({
        borderColor: color === BUTTON_COLORS.tertiary
            ? vars.color.border
            : vars.color[color],
        backgroundColor: vars.color.card,
        color: vars.color[`${color}SubtleForeground` as ColorVarKey],
        selectors: {
            '&:hover': {
                backgroundColor: vars.color[`${color}Subtle` as ColorVarKey],
            },
            '&:active': {
                backgroundColor: vars.color[`${color}SubtleActive` as ColorVarKey],
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[`${color}SubtleActive` as ColorVarKey],
            },
            '&[data-active="true"]:hover': {
                backgroundColor: vars.color[`${color}Subtle` as ColorVarKey],
            },
            '&[data-active="true"]:active': {
                backgroundColor: vars.color[`${color}SubtleActive` as ColorVarKey],
            },
        },
    }),
)
