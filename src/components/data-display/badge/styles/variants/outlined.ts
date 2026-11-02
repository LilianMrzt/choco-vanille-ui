import { vars } from '@theme/styles/contract/contract.css.ts'
import { BADGE_VARIANTS } from '@components/data-display/badge/constants'
import { createBadgeCompoundVariantUtils } from '@components/data-display/badge/styles/variants/utils/createBadgeCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color;

/**
 * Compound variants for the "outlined" visual variant.
 */
export const outlineCompoundVariants = createBadgeCompoundVariantUtils(
    BADGE_VARIANTS.outlined,
    (color) => ({
        borderColor: vars.color[`${color}SubtleBorder` as ColorVarKey],
        color: vars.color[`${color}SubtleForeground` as ColorVarKey],
    }),
)
