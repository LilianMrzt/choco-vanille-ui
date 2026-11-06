import { describe, expect, it } from 'vitest'

import type { RichTextValue } from '@components/forms/rich-text-editor'
import { createRichTextPlaygroundSource } from '@stories/forms/rich-text-editor/utils/createRichTextPlaygroundSource.utils'

const value: RichTextValue = { type: 'doc', content: [] }

describe('createRichTextPlaygroundSource', () => {
    const transform = createRichTextPlaygroundSource(value)

    it('shows the current field props and rendered document', () => {
        const source = transform('', {
            args: { label: 'Summary', helperText: 'Help', value },
        })

        expect(source).toContain('<RichTextEditorField label={"Summary"} helperText={"Help"}')
        expect(source).toContain('useState<RichTextValue>({"type":"doc","content":[]})')
        expect(source).toContain('<RichTextRenderer value={value}')
        expect(source).not.toMatch(/\{\{\w+}}/)
    })

    it('shows the selected compound slots without leaking demo props', () => {
        const source = transform('', {
            args: {
                label: 'Details',
                value,
                useCompoundLayout: true,
                showTextSizeMenu: true,
                textSizePresentation: 'select',
                showTextStyleGroup: true,
                showToolbarSeparator: true,
                name: 'details',
            },
        })

        expect(source).toContain('<RichTextEditor label={"Details"} name={"details"}')
        expect(source).toContain('<RichTextEditor.Label>{"Details"}</RichTextEditor.Label>')
        expect(source).toContain('<RichTextEditor.TextAppearanceGroup.TextSizeMenu presentation={"select"} />')
        expect(source).toContain('<RichTextEditor.TextStyleGroup />')
        expect(source).toContain('<RichTextEditor.ToolbarSeparator />')
        expect(source).not.toContain('showTextSizeMenu=')
        expect(source).not.toContain('<RichTextEditor.ToolbarGroups')
    })

    it('uses the read-only slot without an editable toolbar', () => {
        const source = transform('', {
            args: { label: 'Details', value, useCompoundLayout: true, readOnly: true, showToolbarGroups: true },
        })

        expect(source).toContain('<RichTextEditor.ReadOnlyField />')
        expect(source).not.toContain('<RichTextEditor.Toolbar>')
        expect(source).not.toContain('<RichTextEditor.EditorField />')
    })
})
