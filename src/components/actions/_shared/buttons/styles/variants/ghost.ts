import { vars } from '@theme/contract.css.ts'
import {
    BUTTON_VARIANTS,
} from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color

/**
 * Compound variants for the "ghost" visual variant.
 */
export const ghostCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.ghost,
    (color) => ({
        color: vars.color[`${color}SubtleForeground` as ColorVarKey],
        selectors: {
            '&:hover': {
                backgroundColor: vars.color[`${color}Subtle` as ColorVarKey],
            },
            '&:active': {
                backgroundColor: vars.color[`${color}SubtleActive` as ColorVarKey],
            },
        },
    }),
)
