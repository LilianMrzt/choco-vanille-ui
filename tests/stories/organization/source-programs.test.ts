import * as ts from 'typescript'
import { describe, expect, it } from 'vitest'

const modules = import.meta.glob<Record<string, unknown>>('/src/stories/**/*.stories.tsx', { eager: true })

const object = (value: unknown): Record<string, unknown> =>
    typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}

describe('Storybook consumer source programs', () => {
    for (const [filename, module] of Object.entries(modules)) {
        if (/\/(?:docs|overview|guidelines)\//.test(filename)) {continue}
        const meta = object(module.default)
        for (const [name, exported] of Object.entries(module)) {
            if (name === 'default' || typeof exported !== 'object' || exported === null) {continue}
            it(`${filename}: ${name} supplies valid public consumer code`, () => {
                const story = object(exported)
                const metaSource = object(object(object(meta.parameters).docs).source)
                const source = { ...metaSource, ...object(object(object(story.parameters).docs).source) }
                const args = { ...object(meta.args), ...object(story.args) }
                const code: unknown = typeof source.transform === 'function'
                    ? source.transform(typeof source.code === 'string' ? source.code : '', { args })
                    : source.code
                expect(typeof code).toBe('string')
                if (typeof code !== 'string') {throw new TypeError('Consumer source must be text')}
                expect(code).toMatch(/from ['"]@choco-vanille\/ui['"]/)
                expect(code).not.toMatch(/@(?:components|stories|resources|theme)\//)
                const result = ts.transpileModule(code, {
                    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.Latest },
                    reportDiagnostics: true,
                    fileName: 'Example.tsx',
                })
                expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')) ?? []).toEqual([])
            })
        }
    }
})
