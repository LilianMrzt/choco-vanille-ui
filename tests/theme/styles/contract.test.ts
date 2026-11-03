import { resolve } from 'node:path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { build } from 'vite'
import { describe, expect, it } from 'vitest'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { darkTheme, lightTheme } from '@theme/themes/themes.const.ts'

const getDeclarations = (body: string): Map<string, string> =>
    new Map(
        body.split(';')
            .map((declaration) => declaration.trim())
            .filter(Boolean)
            .map((declaration) => {
                const separator = declaration.indexOf(':')
                if (separator < 0) {
                    throw new Error(`Invalid declaration: ${declaration}`)
                }
                return [
                    declaration.slice(0, separator).trim(),
                    declaration.slice(separator + 1).trim(),
                ]
            }),
    )

const expectTokens = (
    declarations: Map<string, string>,
    contract: object,
    values: object,
): void => {
    const tokenValues = new Map(Object.entries(values))
    for (const [key, token] of Object.entries(contract)) {
        const value = tokenValues.get(key)
        if (typeof token === 'string') {
            expect(declarations.get(token.slice(4, -1))).toBe(value)
        } else if (typeof token === 'object' && token !== null && typeof value === 'object' && value !== null) {
            expectTokens(declarations, token, value)
        } else {
            throw new Error(`Invalid theme token: ${key}`)
        }
    }
}

describe('theme CSS contract', () => {
    it('extracts complete themed declarations for nested scopes and system dark mode', async () => {
        const result = await build({
            configFile: false,
            logLevel: 'silent',
            plugins: [vanillaExtractPlugin()],
            resolve: { alias: { '@theme': resolve(process.cwd(), 'src', 'theme') } },
            build: {
                write: false,
                minify: false,
                cssCodeSplit: false,
                lib: {
                    entry: resolve(process.cwd(), 'src', 'theme', 'styles', 'contract', 'contract.css.ts'),
                    formats: ['es'],
                },
            },
        })
        const outputs = (Array.isArray(result) ? result : [result]).flatMap((bundle) => {
            if (!('output' in bundle)) {
                throw new Error('Expected a completed CSS build')
            }
            return bundle.output
        })
        const css = outputs.find((output) =>
            output.type === 'asset' && output.fileName.endsWith('.css'),
        )
        if (!css || css.type !== 'asset') {
            throw new Error('Theme CSS was not extracted')
        }
        const stylesheet = css.source.toString()
        expect(stylesheet).toContain('@layer choco-vanille.theme')

        const rules = Array.from(stylesheet.matchAll(/([^{}]+)\{([^{}]*)\}/g))
        const declarationsFor = (selector: string): Map<string, string> => {
            const rule = rules.find((match) =>
                match[1].split(',').some((part) => part.trim() === selector),
            )
            if (!rule) {
                throw new Error(`Missing CSS selector: ${selector}`)
            }
            return getDeclarations(rule[2])
        }

        const dark = declarationsFor('[data-theme="dark"]')
        const light = declarationsFor('[data-theme="light"]')
        expect(declarationsFor('.choco-vanille-theme-dark')).toEqual(dark)
        expect(declarationsFor('.choco-vanille-theme-light')).toEqual(light)

        const media = stylesheet.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root:not\(\[data-theme\]\):not\(\.choco-vanille-theme-dark\):not\(\.choco-vanille-theme-light\)\s*\{([^}]*)\}/)
        if (!media) {
            throw new Error(`Missing system dark rule: ${stylesheet.slice(stylesheet.indexOf('@media'), stylesheet.indexOf('@media') + 200)}`)
        }
        const automaticDark = getDeclarations(media[1])

        for (const key of ['color', 'editorColors', 'shadow', 'dropShadow'] as const) {
            expectTokens(dark, vars[key], darkTheme[key])
            expectTokens(light, vars[key], lightTheme[key])
            expectTokens(automaticDark, vars[key], darkTheme[key])
        }
        expect(light.has('--space-md')).toBe(false)
        expect(dark.has('--space-md')).toBe(false)
    })
})
// @vitest-environment node
