import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Sizes } from '@stories/foundation/icon/Icon.stories'
import IconSizes from '@stories/foundation/icon/components/icon-sizes/IconSizes'

describe('Icon stories', () => {
    it('renders every labelled size', () => {
        render(<IconSizes />)

        expect(screen.getAllByRole('img')).toHaveLength(6)
        expect(screen.getByRole('img', { name: '2xl' })).toBeTruthy()
    })

    it('generates consumer source from current controls', () => {
        const source = meta.parameters.docs.source.transform('', {
            args: { ...meta.args, color: 'red', padding: 8, 'aria-label': 'Search', 'aria-labelledby': 'search-label', id: 'search-icon', width: '24' },
        })

        expect(source).toContain('color={"red"}')
        expect(source).toContain('padding={8}')
        expect(source).toContain('aria-label={"Search"}')
        expect(source).toContain('aria-labelledby={"search-label"}')
        expect(source).toContain('id={"search-icon"}')
        expect(source).toContain('width={"24"}')
        expect(source).toContain("from '@iconify-icons/lucide/search'")
        expect(source).not.toContain('undefined')
    })

    it('contains valid JSX for the size comparison', () => {
        const source = Sizes.parameters?.docs.source.code
        const result = ts.transpileModule(source, {
            fileName: 'Icon.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        })

        expect(result.diagnostics).toEqual([])
    })
})
