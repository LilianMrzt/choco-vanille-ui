import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents'
import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    DRAWER_ITEM_COLORS_ARRAY,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants'

/** Neutral-text drawer rows with palette-specific outlined selection and surfaces. */
export const outlinedCompoundVariants = DRAWER_ITEM_COLORS_ARRAY.map((color) => {
    const family = vars.color[COLOR_INTENT_TOKENS[color]]

    return {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.outlined,
            color,
        },
        style: {
            color: vars.color.text.secondary,
            selectors: {
                '&:hover:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtle,
                },
                '&:active:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtleHover,
                },
                '&[data-active="true"]': {
                    backgroundColor: family.subtle,
                    borderColor: family.border,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtleHover,
                },
                '&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtleHover,
                },
            },
        },
    }
})
