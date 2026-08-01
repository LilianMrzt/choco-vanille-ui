import { vars } from '@theme/contract.css.ts'
import { BADGE_VARIANTS } from '@components/data-display/badge/constants'
import { createBadgeCompoundVariantUtils } from '@components/data-display/badge/styles/variants/utils/createBadgeCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color;

/**
 * Compound variants for the "contained" visual variant.
 */
export const solidCompoundVariants = createBadgeCompoundVariantUtils(
    BADGE_VARIANTS.contained,
    (color) => ({
        backgroundColor: vars.color[color],
        color: vars.color[`${color}Foreground` as ColorVarKey],
    }),
)
