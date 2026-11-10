import { describe, expect, it } from 'vitest'

import { darkTheme, lightTheme, vars } from '@theme'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'
import { RADIUS_OPTIONS, ROUNDED } from '@stories/_shared/layout-controls/constants'
import {
    buildPlainCssScaffold,
    buildStaticRows,
    buildThemedRows,
    buildThemeCSS,
    buildVanillaExtractSnippet,
    editorColorRows,
    radiusRows,
} from '@stories/docs/css-variables/utils/theme/theme.utils.ts'

describe('theme variable documentation', () => {
    it('documents every editor tone with its real light and dark values', () => {
        expect(editorColorRows).toHaveLength(21)
        expect(editorColorRows).toContainEqual({
            variable: '--editorColors-ocean-base',
            lightValue: lightTheme.editorColors.ocean.base,
            darkValue: darkTheme.editorColors.ocean.base,
        })
        expect(editorColorRows).toContainEqual({
            variable: '--editorColors-neutral-light',
            lightValue: lightTheme.editorColors.neutral.light,
            darkValue: darkTheme.editorColors.neutral.light,
        })
    })

    it('includes all editor variables in copied theme CSS, scaffolds, and typed references', () => {
        const css = buildThemeCSS()
        const scaffold = buildPlainCssScaffold()
        const reference = buildVanillaExtractSnippet()

        for (const row of editorColorRows) {
            expect(css).toContain(`${row.variable}: ${row.lightValue};`)
            expect(css).toContain(`${row.variable}: ${row.darkValue};`)
            expect(scaffold).toContain(`${row.variable}: ;`)
            const path = row.variable.slice('--editorColors-'.length).replace('-', '.')
            expect(reference).toContain(`vars.editorColors.${path}`)
        }
    })

    it('reports missing variable references and missing dark values explicitly', () => {
        expect(() => buildStaticRows({ primary: '#ffffff' }, {})).toThrow('Missing CSS variable reference: primary')
        expect(() => buildThemedRows({ primary: '#ffffff' }, {}, { primary: vars.color.primary.main }))
            .toThrow('Incomplete themed CSS variable: primary')
    })

    it('copies the current semantic vocabulary without legacy aliases', () => {
        const css = buildThemeCSS()
        const reference = buildVanillaExtractSnippet()

        for (const [key] of getColorEntries(vars.color)) {
            expect(css).toContain(`--color-${key.replace('.', '-')}:`)
            expect(reference).toContain(`vars.color.${key}`)
        }

        expect(reference).toContain('background: vars.color.surface.main,')
        expect(css).not.toMatch(/--color-(?:card|destructive|tertiary|ring|text|purple):/)
        expect(reference).not.toMatch(/vars\.color\.(?:card|destructive|tertiary|ring|purple)\b/)
        expect(reference).toContain('vars.color.primary.subtleForeground')
        expect(reference).not.toContain('vars.color.primary-subtleForeground')
        expect(css).not.toContain('[object Object]')
    })

    it('uses bracket notation for numeric-leading token keys', () => {
        const reference = buildVanillaExtractSnippet()

        expect(reference).toContain('vars.space[32]')
        expect(reference).toContain('vars.fontSize[10]')
        expect(reference).not.toContain('vars.space.32')
        expect(reference).not.toContain('vars.fontSize.10')
        expect(reference).toContain('vars.radius[8]')
        expect(reference).not.toMatch(/vars\.(?:lineHeight|letterSpacing)\b/)
    })

    it('documents every radius token in CSS and typed references', () => {
        const css = buildThemeCSS()
        const scaffold = buildPlainCssScaffold()
        const reference = buildVanillaExtractSnippet()

        expect(radiusRows).toHaveLength(Object.keys(lightTheme.radius).length)
        expect(RADIUS_OPTIONS.map(String)).toEqual(Object.keys(lightTheme.radius))
        expect(ROUNDED).toEqual([undefined, ...RADIUS_OPTIONS])
        for (const row of radiusRows) {
            const key = row.variable.slice('--radius-'.length)
            const tokenReference = key === 'full' ? 'vars.radius.full' : `vars.radius[${key}]`
            expect(css).toContain(`${row.variable}: ${row.lightValue};`)
            expect(scaffold).toContain(`${row.variable}: ;`)
            expect(reference).toContain(tokenReference)
        }
    })
})
