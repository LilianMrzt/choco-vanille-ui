import { describe, expect, expectTypeOf, it } from 'vitest'

import type {
    AvatarColor,
    BadgeColor,
    ButtonColor,
    CalloutVariant,
    DrawerActionItemProps,
    NotificationCardVariant,
    ProgressColor,
    SliderColor,
    SpinnerColor,
    TableRowIntent,
} from '@/index.ts'
import { COLOR_INTENT_TOKENS } from '@theme/constants/color-intents/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { BUTTON_COLORS_ARRAY } from '@components/actions/_shared/buttons/constants'
import { BADGE_COLORS_ARRAY } from '@components/data-display/badge/constants'
import { containedCompoundVariants } from '@components/actions/_shared/buttons/styles/variants/contained.ts'
import { createBadgeCompoundVariants } from '@components/data-display/badge/utils/create-badge-compound-variants/createBadgeCompoundVariants.utils.ts'

const INTENT_PAIRS = [
    ['primary', 'primary'],
    ['secondary', 'secondary'],
    ['neutral', 'neutral'],
    ['danger', 'danger'],
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
    it('exposes the renamed colors through the public types', () => {
        type Colors = [ButtonColor, AvatarColor, BadgeColor, ProgressColor, SpinnerColor, NonNullable<DrawerActionItemProps['color']>]
        type MatchingColors<T extends readonly unknown[], Color> = { [Index in keyof T]: Extract<T[Index], Color> }
        expectTypeOf<MatchingColors<Colors, 'neutral' | 'danger'>>()
            .toEqualTypeOf<['neutral' | 'danger', 'neutral' | 'danger', 'neutral' | 'danger', 'neutral' | 'danger', 'neutral' | 'danger', 'neutral' | 'danger']>()
        expectTypeOf<MatchingColors<Colors, 'tertiary' | 'destructive'>>()
            .toEqualTypeOf<[never, never, never, never, never, never]>()
        expectTypeOf<MatchingColors<[SliderColor, TableRowIntent], 'danger'>>().toEqualTypeOf<['danger', 'danger']>()
        expectTypeOf<MatchingColors<[SliderColor, TableRowIntent], 'destructive'>>().toEqualTypeOf<[never, never]>()
        expectTypeOf<CalloutVariant>().toEqualTypeOf<'info' | 'success' | 'warning' | 'danger'>()
        expectTypeOf<NotificationCardVariant>().toEqualTypeOf<'info' | 'success' | 'warning' | 'danger'>()
    })

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
                    '&:hover:not(:disabled):not([aria-disabled="true"])': { backgroundColor: vars.color[token].hover },
                    '&:active:not(:disabled):not([aria-disabled="true"])': { backgroundColor: vars.color[token].pressed },
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
