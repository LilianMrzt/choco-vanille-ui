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
        color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
        selectors: {
            '&:hover:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
            },
            '&:active:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
            '&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
            },
            '&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
        },
    }),
)
