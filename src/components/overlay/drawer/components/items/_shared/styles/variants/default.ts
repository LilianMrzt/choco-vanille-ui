import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents'
import { vars } from '@theme/styles/contract/contract.css.ts'
import {
    DRAWER_ITEM_COLORS_ARRAY,
    DRAWER_ITEM_VARIANTS,
} from '@components/overlay/drawer/components/items/_shared/constants'

/** Neutral-text drawer rows with palette-specific surfaces and filled selection. */
export const defaultCompoundVariants = DRAWER_ITEM_COLORS_ARRAY.map((color) => {
    const family = vars.color[COLOR_INTENT_TOKENS[color]]

    return {
        variants: {
            variant: DRAWER_ITEM_VARIANTS.default,
            color,
        },
        style: {
            color: vars.color.text.secondary,
            selectors: {
                '&:hover:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtle,
                    color: vars.color.text.primary,
                },
                '&:active:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.subtleHover,
                    color: vars.color.text.primary,
                },
                '&[data-active="true"]': {
                    backgroundColor: family.main,
                    color: family.foreground,
                    borderColor: 'transparent',
                },
                '&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.hover,
                    color: family.foreground,
                },
                '&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])': {
                    backgroundColor: family.pressed,
                    color: family.foreground,
                },
            },
        },
    }
})
