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
                if (!filename.includes('/svg-image/')) {
                    expect(code).not.toMatch(/import\s+[^;\n]*Icon[^;\n]*from ['"]\./)
                    expect(code).not.toContain('.svg?react')
                }
                const sourceFile = ts.createSourceFile('Example.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
                const importNames: string[] = []
                const nodes: ts.Node[] = [sourceFile]
                while (nodes.length > 0) {
                    const node = nodes.pop()!
                    if (ts.isImportDeclaration(node)) {
                        expect(node.parent).toBe(sourceFile)
                        const clause = node.importClause
                        if (clause?.name) { importNames.push(clause.name.text) }
                        if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
                            importNames.push(...clause.namedBindings.elements.map(binding => binding.name.text))
                        }
                    }
                    nodes.push(...node.getChildren(sourceFile))
                }
                expect(new Set(importNames).size).toBe(importNames.length)
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
