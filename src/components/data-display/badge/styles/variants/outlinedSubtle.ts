import { vars } from '@theme/contract.css.ts'
import { BADGE_VARIANTS } from '@components/data-display/badge/constants'
import { createBadgeCompoundVariantUtils } from '@components/data-display/badge/styles/variants/utils/createBadgeCompoundVariant.utils.ts'

type ColorVarKey = keyof typeof vars.color;

/**
 * Compound variants for the "outlinedSubtle" visual variant.
 */
export const outlinedSubtleCompoundVariants = createBadgeCompoundVariantUtils(
    BADGE_VARIANTS.outlinedSubtle,
    (color) => ({
        backgroundColor: vars.color[`${color}Subtle` as ColorVarKey],
        borderColor: vars.color[`${color}SubtleBorder` as ColorVarKey],
        color: vars.color[`${color}SubtleForeground` as ColorVarKey],
    }),
)
