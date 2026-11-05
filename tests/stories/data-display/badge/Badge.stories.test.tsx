import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Colors, Sizes, Variants, WithIcons } from '@stories/data-display/badge/Badge.stories'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'

describe('Badge stories', () => {
    it.each([Colors, Sizes, Variants, WithIcons])('emits valid TSX for comparative examples', (story) => {
        const source = story.parameters?.docs.source.code
        expect(typeof source).toBe('string')
        const result = ts.transpileModule(source, {
            fileName: 'Badge.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })

    it('maps serializable icon controls to the real SVG components', () => {
        expect(meta.argTypes.startIcon.mapping.None).toBeUndefined()
        expect(meta.argTypes.startIcon.mapping.Check).toBe(CheckIcon)
        expect(meta.argTypes.endIcon.mapping.None).toBeUndefined()
        expect(meta.argTypes.endIcon.mapping.Chevron).toBe(ChevronRightIcon)
    })

    it('keeps the consumer snippet aligned with current controls', () => {
        const source = meta.parameters.docs.source.transform('', {
            args: {
                ...meta.args,
                label: 'A "quoted" label',
                variant: 'contained',
                color: 'success',
                size: 'lg',
                borderRadius: 'full',
                width: 'fit-content',
                startIcon: CheckIcon,
                style: { opacity: 0.5 },
            },
        })

        expect(source).toContain('from \'@choco-vanille/ui\'')
        expect(source).toContain('label={"A \\"quoted\\" label"}')
        expect(source).toContain('variant="contained" color="success" size="lg"')
        expect(source).toContain('borderRadius={"full"}')
        expect(source).toContain('width={"fit-content"}')
        expect(source).toContain('startIcon={CheckIcon}')
        expect(source).toContain('style={{"opacity":0.5}}')
        expect(source).not.toContain('endIcon=')
    })

    it('omits optional controls that have been cleared instead of writing invalid JSX values', () => {
        const source = meta.parameters.docs.source.transform('', {
            args: { label: 'Badge' },
        })

        expect(source).toContain('<Badge label={"Badge"} />')
        expect(source).not.toContain('undefined')
    })
})
