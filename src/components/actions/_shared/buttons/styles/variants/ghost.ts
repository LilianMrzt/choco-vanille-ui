import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    BUTTON_VARIANTS,
} from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

/**
 * Compound variants for the "ghost" visual variant.
 */
export const ghostCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.ghost,
    (color) => ({
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
