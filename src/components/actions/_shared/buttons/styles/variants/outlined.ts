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
            ? vars.color.border.main
            : vars.color[COLOR_INTENT_TOKENS[color]].main,
        backgroundColor: vars.color.surface.main,
        color: vars.color[COLOR_INTENT_TOKENS[color]].subtleForeground,
        selectors: {
            '&:hover': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
            },
            '&:active': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
            '&[data-active="true"]': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
            '&[data-active="true"]:hover': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtle,
            },
            '&[data-active="true"]:active': {
                backgroundColor: vars.color[COLOR_INTENT_TOKENS[color]].subtlePressed,
            },
        },
    }),
)
