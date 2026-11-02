import { describe, expect, it } from 'vitest'

import { darkColors, lightColors, palette } from '@theme'

const intents = [
    'primary', 'secondary', 'neutral', 'success', 'warning', 'info',
    'danger', 'accentPurple', 'accentPink', 'accentOrange', 'accentTeal', 'accentCyan', 'accentIndigo',
] as const

const states = ['', 'Hover', 'Active'] as const

const surfaces = ['background', 'surface', 'surfaceElevated', 'surfaceMuted'] as const

const getLuminance = (color: string): number => {
    if (!/^#[\da-f]{6}$/i.test(color)) {
        throw new Error(`Expected a six-digit sRGB color: ${color}`)
    }

    const channels = [1, 3, 5].map((offset) => {
        const channel = Number.parseInt(color.slice(offset, offset + 2), 16) / 255

        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })

    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

const expectContrast = (foreground: string, background: string, minimum: number, pair: string): void => {
    const foregroundLuminance = getLuminance(foreground)
    const backgroundLuminance = getLuminance(background)
    const ratio = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
        / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)

    expect(ratio, pair).toBeGreaterThanOrEqual(minimum)
}

describe('semantic colors', () => {
    it('uses in-gamut sRGB primitives without changing public palette names', () => {
        expect(Object.keys(palette)).toEqual([
            'neutral', 'brand', 'secondary', 'blue', 'green', 'amber', 'red',
            'purple', 'pink', 'orange', 'teal', 'cyan', 'indigo', 'white', 'black',
        ])

        for (const ramp of Object.values(palette)) {
            const values = typeof ramp === 'string' ? [ramp] : Object.values(ramp)
            for (const value of values) {
                expect(value).toMatch(/^#[\da-f]{6}$/i)
            }
        }
    })

    it('uses the complete semantic vocabulary including CSS keyword tokens', () => {
        const baseTokens = [
            'currentColor', 'transparent', 'background', 'foreground', 'foregroundMuted', 'foregroundSubtle',
            'surface', 'surfaceForeground', 'surfaceElevated', 'surfaceElevatedForeground', 'surfaceMuted',
            'surfaceMutedForeground', 'overlay', 'link', 'linkHover', 'linkActive',
            'border', 'borderStrong', 'focusRing', 'highlight', 'highlightForeground',
            'skeletonBase', 'skeletonHighlight',
        ]
        const intentTokens = intents.flatMap((intent) => [
            intent, `${intent}Hover`, `${intent}Active`, `${intent}Foreground`,
            `${intent}Subtle`, `${intent}SubtleHover`, `${intent}SubtleActive`,
            `${intent}SubtleForeground`, `${intent}SubtleBorder`,
        ])
        const expectedTokens = [...baseTokens, ...intentTokens].sort()

        expect(Object.keys(lightColors).sort()).toEqual(expectedTokens)
        expect(Object.keys(darkColors).sort()).toEqual(expectedTokens)
        expect(lightColors.currentColor).toBe('currentColor')
        expect(darkColors.currentColor).toBe('currentColor')
        expect(lightColors.transparent).toBe('transparent')
        expect(darkColors.transparent).toBe('transparent')
    })

    describe.each([
        { name: 'light', colors: lightColors },
        { name: 'dark', colors: darkColors },
    ])('$name theme', ({ colors }) => {
        it('maintains 4.5:1 text contrast in every solid and subtle interaction state', () => {
            for (const intent of intents) {
                for (const state of states) {
                    expectContrast(colors[`${intent}Foreground`], colors[`${intent}${state}`], 4.5, `${intent}${state}`)
                    expectContrast(colors[`${intent}SubtleForeground`], colors[`${intent}Subtle${state}`], 4.5, `${intent}Subtle${state}`)
                }
            }
        })

        it('maintains 4.5:1 for text hierarchy and links on supported neutral surfaces', () => {
            const textTokens = [
                'foreground', 'foregroundMuted', 'foregroundSubtle', 'surfaceMutedForeground',
                'link', 'linkHover', 'linkActive',
            ] as const

            for (const surface of surfaces) {
                for (const token of textTokens) {
                    expectContrast(colors[token], colors[surface], 4.5, `${token} on ${surface}`)
                }
            }
            expectContrast(colors.surfaceForeground, colors.surface, 4.5, 'surface')
            expectContrast(colors.surfaceElevatedForeground, colors.surfaceElevated, 4.5, 'surfaceElevated')
            expectContrast(colors.highlightForeground, colors.highlight, 4.5, 'highlight')
        })

        it('keeps ghost and outlined foregrounds legible on neutral surfaces', () => {
            for (const intent of intents) {
                for (const surface of surfaces) {
                    expectContrast(colors[`${intent}SubtleForeground`], colors[surface], 4.5, `${intent}SubtleForeground on ${surface}`)
                }
            }
        })

        it('maintains 3:1 focus and field borders on supported neutral surfaces', () => {
            for (const surface of surfaces) {
                for (const token of ['focusRing', 'border', 'borderStrong'] as const) {
                    expectContrast(colors[token], colors[surface], 3, `${token} on ${surface}`)
                }
            }
        })

        it('maintains 3:1 intent borders across subtle interaction states', () => {
            for (const intent of intents) {
                for (const state of states) {
                    expectContrast(colors[`${intent}SubtleBorder`], colors[`${intent}Subtle${state}`], 3, `${intent}SubtleBorder on ${state || 'rest'}`)
                }
            }
        })
    })
})
