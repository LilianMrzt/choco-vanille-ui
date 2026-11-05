import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Colors, Numbers, Playground, Positions, Sizes } from '@stories/data-display/status-badge/StatusBadge.stories'

describe('StatusBadge stories', () => {
    it.each([Colors, Positions, Sizes, Numbers])('provides syntactically valid TSX for comparative examples', (story) => {
        const source = story.parameters?.docs.source.code
        expect(typeof source).toBe('string')
        const result = ts.transpileModule(source, {
            fileName: 'StatusBadge.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics).toEqual([])
    })

    it('preserves zero and explicitly empty labels in its consumer snippet', () => {
        const source = Playground.parameters.docs.source.transform('', {
            args: { ...meta.args, number: 0, label: '' },
        })

        expect(source).toContain('number={0} label={""}')
        expect(source).toContain('<Avatar initials="JD" />')
        expect(source).toContain('from \'@choco-vanille/ui\'')
    })

    it('omits optional controls that are cleared', () => {
        const source = Playground.parameters.docs.source.transform('', {
            args: { children: meta.args.children },
        })

        expect(source).toContain('<StatusBadge>')
        expect(source).not.toContain('undefined')
    })
})
