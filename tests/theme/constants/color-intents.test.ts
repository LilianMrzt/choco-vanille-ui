import { describe, expect, it } from 'vitest'

import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_COLORS_ARRAY } from '@components/actions/_shared/buttons/constants'
import { BADGE_COLORS_ARRAY } from '@components/data-display/badge/constants'
import { containedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/contained.ts'
import { createBadgeCompoundVariants } from '@components/data-display/badge/utils/create-badge-compound-variants/createBadgeCompoundVariants.utils.ts'

const INTENT_PAIRS = [
    ['primary', 'primary'],
    ['secondary', 'secondary'],
    ['tertiary', 'neutral'],
    ['destructive', 'danger'],
    ['success', 'success'],
    ['warning', 'warning'],
    ['info', 'info'],
    ['purple', 'accentPurple'],
    ['pink', 'accentPink'],
    ['orange', 'accentOrange'],
    ['teal', 'accentTeal'],
    ['cyan', 'accentCyan'],
    ['indigo', 'accentIndigo'],
] as const

describe('component color intentions', () => {
    it.each(INTENT_PAIRS)('maps %s to %s without changing component intentions', (intent, token) => {
        expect(COLOR_INTENT_TOKENS[intent]).toBe(token)
    })

    it.each(BUTTON_COLORS_ARRAY)('uses semantic solid tokens for the %s button intention', (intent) => {
        const token = COLOR_INTENT_TOKENS[intent]

        expect(containedCompoundVariants).toContainEqual({
            variants: { variant: 'contained', color: intent },
            style: expect.objectContaining({
                backgroundColor: vars.color[token].main,
                color: vars.color[token].foreground,
                selectors: expect.objectContaining({
                    '&:hover': { backgroundColor: vars.color[token].hover },
                    '&:active': { backgroundColor: vars.color[token].pressed },
                    '&[data-active="true"]': { backgroundColor: vars.color[token].pressed },
                }),
            }),
        })
    })

    it.each(BADGE_COLORS_ARRAY)('uses semantic subtle tokens for the %s badge intention', (intent) => {
        const token = COLOR_INTENT_TOKENS[intent]

        expect(createBadgeCompoundVariants()).toContainEqual({
            variants: { variant: 'outlinedSubtle', color: intent },
            style: {
                backgroundColor: vars.color[token].subtle,
                borderColor: vars.color[token].subtleHover,
                color: vars.color[token].subtleForeground,
            },
        })
        expect(createBadgeCompoundVariants()).toContainEqual({
            variants: { variant: 'outlined', color: intent },
            style: {
                borderColor: vars.color[token].subtleHover,
                color: vars.color[token].subtleForeground,
            },
        })
    })
})
