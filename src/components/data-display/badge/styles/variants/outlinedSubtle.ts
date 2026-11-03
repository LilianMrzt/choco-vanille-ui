import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BADGE_VARIANTS } from '@components/data-display/badge/constants'
import { createBadgeCompoundVariantUtils } from '@components/data-display/badge/styles/variants/utils/createBadgeCompoundVariant.utils.ts'

/**
 * Compound variants for the "outlinedSubtle" visual variant.
 */
export const outlinedSubtleCompoundVariants = createBadgeCompoundVariantUtils(
    BADGE_VARIANTS.outlinedSubtle,
    (color) => ({
        backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
        borderColor: vars.color[COLOR_INTENT_TOKENS[color]].subtleBorder,
        color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
    }),
)
