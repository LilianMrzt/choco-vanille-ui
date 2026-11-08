import { describe, expect, it } from 'vitest'

import { defaultCompoundVariants } from '@components/overlay/drawer/components/items/_shared/styles/variants/default'
import { outlinedCompoundVariants } from '@components/overlay/drawer/components/items/_shared/styles/variants/outlined'
import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents'
import { vars } from '@theme/styles/contract/contract.css'

describe('Drawer item interaction colors', () => {
    it.each(defaultCompoundVariants)('keeps default $variants.color states in the selected palette', ({ variants, style }) => {
        const family = vars.color[COLOR_INTENT_TOKENS[variants.color]]

        expect(style.color).toBe(vars.color.text.secondary)
        expect(style.selectors['&:hover:not(:disabled):not([aria-disabled="true"])'].color).toBe(vars.color.text.primary)
        expect(style.selectors['&:active:not(:disabled):not([aria-disabled="true"])'].color).toBe(vars.color.text.primary)
        expect(style.selectors['&:active:not(:disabled):not([aria-disabled="true"])'].backgroundColor).toBe(family.subtleHover)
        expect(style.selectors['&[data-active="true"]'].color).toBe(family.foreground)
        expect(style.selectors['&[data-active="true"]'].backgroundColor).toBe(family.main)
        expect(style.selectors['&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])'].color).toBe(family.foreground)
        expect(style.selectors['&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])'].color).toBe(family.foreground)
    })

    it.each(outlinedCompoundVariants)('keeps outlined $variants.color selection in the selected palette', ({ variants, style }) => {
        const family = vars.color[COLOR_INTENT_TOKENS[variants.color]]

        expect(style.color).toBe(vars.color.text.secondary)
        expect(style.selectors['&[data-active="true"]'].color).toBe(vars.color.text.primary)
        expect(style.selectors['&:active:not(:disabled):not([aria-disabled="true"])'].backgroundColor).toBe(family.subtleHover)
        expect(style.selectors['&[data-active="true"]'].borderColor).toBe(family.border)
        expect(style.selectors['&[data-active="true"]:hover:not(:disabled):not([aria-disabled="true"])'].backgroundColor).toBe(family.subtleHover)
        expect(style.selectors['&[data-active="true"]:active:not(:disabled):not([aria-disabled="true"])'].backgroundColor).toBe(family.subtleHover)
    })
})
