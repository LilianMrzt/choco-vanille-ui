import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_VARIANTS } from '@components/actions/_shared/buttons/constants'
import { createButtonCompoundVariantUtils } from '@components/actions/_shared/buttons/styles/variants/utils/createButtonCompoundVariant.utils.ts'

/**
 * Compound variants for the "contained" (solid) visual variant.
 * Every intent follows the same pattern: solid fill + Hover/Active states.
 */
export const containedCompoundVariants = createButtonCompoundVariantUtils(
    BUTTON_VARIANTS.contained,
    (color) => ({
        backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].main,
        color: vars.color[COLOR_INTENT_TOKENS[color]].foreground,
        selectors: {
            '&:hover:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].hover,
            },
            '&:active:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].pressed,
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].pressed,
            },
            '&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].hover,
            },
            '&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].pressed,
            },
        },
    }),
)
