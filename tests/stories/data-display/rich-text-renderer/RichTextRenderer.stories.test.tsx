import { describe, expect, it, vi } from 'vitest'
import ts from 'typescript'

import type { RichTextValue } from '@components/forms/rich-text-editor'
import meta from '@stories/data-display/rich-text-renderer/RichTextRenderer.stories'

vi.mock('@storybook/addon-docs/blocks', () => ({
    Canvas: () => null,
    Controls: () => null,
    Description: () => null,
    Markdown: () => null,
    Stories: () => null,
    Title: () => null,
}))

describe('RichTextRenderer story source', () => {
    it('serializes the current document and optional container props without reinterpreting content', () => {
        const value: RichTextValue = {
            type: 'doc',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: '"Quoted" {{width}} $&' }] }],
        }
        const source = meta.parameters.docs.source.transform('', {
            args: {
                value,
                as: 'article',
                width: '100%',
                color: 'var(--brand)',
                style: { marginTop: 8 },
            },
        })

        expect(source).toContain("from '@choco-vanille/ui'")
        expect(source).toContain('const value: RichTextValue = ' + JSON.stringify(value, null, 4))
        expect(source).toContain('<RichTextRenderer value={value} as="article" width={"100%"} color={"var(--brand)"} style={{"marginTop":8}} />')
        const result = ts.transpileModule(source, {
            fileName: 'RichTextRenderer.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })

    it('omits optional attributes after Controls reset', () => {
        const source = meta.parameters.docs.source.transform('', { args: meta.args })
        expect(source).toContain('<RichTextRenderer value={value} />')
    })
})
