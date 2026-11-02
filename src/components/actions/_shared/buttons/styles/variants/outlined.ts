import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_COLORS, BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

/**
 * Compound variants for the "outlined" visual variant.
 */
export const outlinedCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.outlined,
    (color) => ({
        borderColor: color === BUTTON_COLORS.tertiary
            ? vars.color.border
            : vars.color[COLOR_INTENT_TOKENS[color]],
        backgroundColor: vars.color.surface,
        color: vars.color[`${COLOR_INTENT_TOKENS[color]}SubtleForeground`],
        selectors: {
            '&:hover': {
                backgroundColor: vars.color[`${COLOR_INTENT_TOKENS[color]}Subtle`],
            },
            '&:active': {
                backgroundColor: vars.color[`${COLOR_INTENT_TOKENS[color]}SubtleActive`],
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[`${COLOR_INTENT_TOKENS[color]}SubtleActive`],
            },
            '&[data-active="true"]:hover': {
                backgroundColor: vars.color[`${COLOR_INTENT_TOKENS[color]}Subtle`],
            },
            '&[data-active="true"]:active': {
                backgroundColor: vars.color[`${COLOR_INTENT_TOKENS[color]}SubtleActive`],
            },
        },
    }),
)
