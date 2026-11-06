import { describe, expect, it } from 'vitest'

import { darkColors, lightColors, palette, vars } from '@theme'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

const intents = [
    'primary', 'secondary', 'neutral', 'success', 'warning', 'info',
    'danger', 'accentPurple', 'accentPink', 'accentOrange', 'accentTeal', 'accentCyan', 'accentIndigo',
] as const

const states = ['main', 'hover', 'pressed'] as const
const surfaces = ['background', 'surface.main', 'surface.elevated', 'surface.muted'] as const
const subtleStates = { main: 'subtle', hover: 'subtleHover', pressed: 'subtlePressed' } as const

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

    it('provides exactly 156 direct leaves in both themes and the variable contract', () => {
        const baseTokens = [
            'currentColor', 'transparent', 'background', 'text.primary', 'text.secondary', 'text.tertiary',
            'surface.main', 'surface.foreground', 'surface.elevated', 'surface.elevatedForeground',
            'surface.muted', 'surface.mutedForeground', 'overlay', 'link.main', 'link.hover', 'link.pressed',
            'border.subtle', 'border.muted', 'border.main', 'border.strong', 'border.stronger',
            'focusRing', 'highlight.main', 'highlight.foreground', 'skeleton.base', 'skeleton.highlight',
        ]
        const intentTokens = intents.flatMap((intent) => [
            `${intent}.main`, `${intent}.hover`, `${intent}.pressed`, `${intent}.foreground`,
            `${intent}.subtle`, `${intent}.subtleHover`, `${intent}.subtlePressed`,
            `${intent}.subtleForeground`, `${intent}.border`, `${intent}.subtleBorder`,
        ])
        const expectedTokens = [...baseTokens, ...intentTokens].sort()

        expect(expectedTokens).toHaveLength(156)
        for (const colors of [lightColors, darkColors, vars.color]) {
            expect(getColorEntries(colors).map(([key]) => key).sort()).toEqual(expectedTokens)
            for (const intent of intents) {
                expect(Object.keys(colors[intent])).toHaveLength(10)
                expect(Object.values(colors[intent]).every(value => typeof value === 'string')).toBe(true)
            }
        }
        expect(lightColors.currentColor).toBe('currentColor')
        expect(darkColors.currentColor).toBe('currentColor')
        expect(lightColors.transparent).toBe('transparent')
        expect(darkColors.transparent).toBe('transparent')
    })

    it('initializes the three new gray border levels explicitly in each mode', () => {
        expect(lightColors.border).toMatchObject({
            subtle: palette.neutral[200], muted: palette.neutral[300], stronger: palette.neutral[600],
        })
        expect(darkColors.border).toMatchObject({
            subtle: palette.neutral[700], muted: palette.neutral[600], stronger: palette.neutral[300],
        })
    })

    it('uses the original light gray for decorative borders', () => {
        expect(lightColors.border.muted).toBe('#d2d5db')
        expect(darkColors.border.muted).toBe('#4f5460')
    })

    it('restores the original light accent surfaces and their decorative borders', () => {
        const expected = {
            primary: ['#dfeaff', '#c5daff'],
            secondary: ['#ffe8fa', '#ffcff4'],
            neutral: ['#e3e6ea', '#d2d5db'],
            success: ['#dcfce7', '#b9f8cf'],
            warning: ['#fef3c6', '#fee685'],
            info: ['#d5ecfc', '#b4dffb'],
            danger: ['#ffe2e2', '#ffc9c9'],
            accentPurple: ['#f3ebff', '#e6d4ff'],
            accentPink: ['#ffe9f4', '#ffd3ea'],
            accentOrange: ['#ffe9d7', '#ffd0a9'],
            accentTeal: ['#d6fbf3', '#a5f3e3'],
            accentCyan: ['#d6faff', '#a4f2ff'],
            accentIndigo: ['#e5edff', '#c9dbff'],
        } as const

        for (const intent of intents) {
            expect([lightColors[intent].subtle, lightColors[intent].subtleHover]).toEqual(expected[intent])
        }
    })

    describe.each([
        { name: 'light', colors: lightColors },
        { name: 'dark', colors: darkColors },
    ])('$name theme', ({ colors }) => {
        const leaves = Object.fromEntries(getColorEntries(colors))

        it('preserves the built-in color values', () => {
            expect(leaves).toMatchSnapshot()
        })

        it('initializes independent accent borders from the existing subtle border values', () => {
            for (const intent of intents) {
                expect(colors[intent].border).toBe(colors[intent].subtleBorder)
            }
        })

        it('orders all five gray border intensities on each supported surface', () => {
            for (const surface of surfaces) {
                const background = getLuminance(leaves[surface])
                const differences = Object.values(colors.border).map(color => Math.abs(getLuminance(color) - background))
                expect(differences).toEqual([...differences].sort((a, b) => a - b))
            }
        })

        it('maintains 4.5:1 text contrast in every solid and subtle interaction state', () => {
            for (const intent of intents) {
                for (const state of states) {
                    expectContrast(colors[intent].foreground, colors[intent][state], 4.5, `${intent}.${state}`)
                    expectContrast(colors[intent].subtleForeground, colors[intent][subtleStates[state]], 4.5, `${intent}.${subtleStates[state]}`)
                }
            }
        })

        it('maintains 4.5:1 for text hierarchy and links on supported neutral surfaces', () => {
            const textTokens = [
                'text.primary', 'text.secondary', 'text.tertiary', 'surface.mutedForeground',
                'link.main', 'link.hover', 'link.pressed',
            ] as const

            for (const surface of surfaces) {
                for (const token of textTokens) {
                    expectContrast(leaves[token], leaves[surface], 4.5, `${token} on ${surface}`)
                }
            }
            expectContrast(colors.surface.foreground, colors.surface.main, 4.5, 'surface')
            expectContrast(colors.surface.elevatedForeground, colors.surface.elevated, 4.5, 'surface.elevated')
            expectContrast(colors.highlight.foreground, colors.highlight.main, 4.5, 'highlight')
        })

        it('keeps ghost and outlined foregrounds legible on neutral surfaces', () => {
            for (const intent of intents) {
                for (const surface of surfaces) {
                    expectContrast(colors[intent].subtleForeground, leaves[surface], 4.5, `${intent}.subtleForeground on ${surface}`)
                }
            }
        })

        it('keeps callout descriptions and icons legible on their subtle surfaces', () => {
            for (const intent of ['info', 'success', 'warning', 'danger'] as const) {
                expectContrast(colors.text.secondary, colors[intent].subtle, 4.5, `description on ${intent}.subtle`)
                expectContrast(colors[intent].main, colors[intent].subtle, 3, `icon on ${intent}.subtle`)
            }
        })

        it('maintains 3:1 focus and field borders on supported neutral surfaces', () => {
            for (const surface of surfaces) {
                for (const token of ['focusRing', 'border.main', 'border.strong'] as const) {
                    expectContrast(leaves[token], leaves[surface], 3, `${token} on ${surface}`)
                }
            }
        })

        it('maintains 3:1 intent borders across subtle interaction states', () => {
            for (const intent of intents) {
                for (const state of states) {
                    expectContrast(colors[intent].subtleBorder, colors[intent][subtleStates[state]], 3, `${intent}.subtleBorder on ${state}`)
                }
                for (const surface of surfaces) {
                    expectContrast(colors[intent].border, leaves[surface], 3, `${intent}.border on ${surface}`)
                }
            }
        })
    })
})
