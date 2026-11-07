import { describe, expect, it } from 'vitest'

import type { RichTextValue } from '@components/forms/rich-text-editor'
import { createRichTextPlaygroundSource } from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/createRichTextPlaygroundSource.utils'

const value: RichTextValue = { type: 'doc', content: [] }

describe('createRichTextPlaygroundSource', () => {
    const transform = createRichTextPlaygroundSource(value)

    it('shows only the controlled field and its current props', () => {
        const source = transform('', {
            args: { label: 'Summary', helperText: 'Help', value },
        })

        expect(source).toContain('<RichTextEditorField label={"Summary"} helperText={"Help"}')
        expect(source).toContain('useState<RichTextValue>({"type":"doc","content":[]})')
        expect(source).not.toContain('RichTextRenderer')
        expect(source).not.toContain('<RichTextEditor ')
        expect(source).not.toMatch(/\{\{\w+}}/)
    })

    it('passes the read-only state to the field', () => {
        const source = transform('', {
            args: { label: 'Details', value, readOnly: true },
        })

        expect(source).toContain('readOnly={true}')
    })
})
