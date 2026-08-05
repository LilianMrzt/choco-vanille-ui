import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import { RichTextEditor, RichTextEditorField } from '@components/forms/rich-text-editor'

beforeAll(() => {
    Object.defineProperty(document, 'elementFromPoint', {
        configurable: true,
        value: () => document.body,
    })
    Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
        configurable: true,
        value: () => [],
    })
    Object.defineProperty(Text.prototype, 'getClientRects', {
        configurable: true,
        value: () => [],
    })
    Object.defineProperty(Text.prototype, 'getBoundingClientRect', {
        configurable: true,
        value: () => new DOMRect(),
    })
    Object.defineProperty(Range.prototype, 'getClientRects', {
        configurable: true,
        value: () => [],
    })
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
        configurable: true,
        value: () => new DOMRect(),
    })
})

describe('RichTextEditor compound API', () => {
    it('renders its children instead of the default layout', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Label>Description</RichTextEditor.Label>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByText('Description')).toBeTruthy()
        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
        expect(screen.queryByRole('toolbar')).toBeNull()
    })

    it('resolves RichTextEditor.Label id from context when id is omitted', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Label>Description</RichTextEditor.Label>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        const label = screen.getByText('Description')
        const editor = screen.getByRole('textbox', { name: 'Description' })

        expect(label.id).toBeTruthy()
        expect(editor.getAttribute('aria-labelledby')).toBe(label.id)
    })

    it('renders RichTextEditor.Toolbar with the toolbar role', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.ToolbarGroups />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeTruthy()
    })

    it('renders every group exposed by RichTextEditor.ToolbarGroups', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.ToolbarGroups />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Undo' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Text color' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Text size' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Add or edit link' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Block format' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Lists' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Text alignment' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Image actions' })).toBeTruthy()
    })

    it('renders individual toolbar groups picked à la carte', async () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.HistoryGroup />
                    <RichTextEditor.TextStyleGroup />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Undo' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
        expect(screen.queryByRole('button', { name: 'Text color' })).toBeNull()

        const boldToggle = screen.getByRole('button', { name: 'Bold' })
        await userEvent.click(boldToggle)

        expect(boldToggle.getAttribute('aria-pressed')).toBe('true')
    })

    it('exposes the TextAppearanceGroup sub-slots', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.TextAppearanceGroup.TextColorMenu />
                    <RichTextEditor.TextAppearanceGroup.TextSizeMenu />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Text color' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Text size' })).toBeTruthy()
    })

    it('submits the editable document through RichTextEditor.EditorField form field', async () => {
        render(
            <form>
                <RichTextEditor
                    label={'Description'}
                    name={'description'}
                >
                    <RichTextEditor.Label>Description</RichTextEditor.Label>
                    <RichTextEditor.EditorField />
                </RichTextEditor>
            </form>,
        )

        await userEvent.type(screen.getByRole('textbox', { name: 'Description' }), 'Hello')

        const submittedValue = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement
        expect(submittedValue.value).toContain('"Hello"')
    })
})

describe('RichTextEditorField', () => {
    it('renders the same default layout as legacy RichTextEditor usage', () => {
        render(<RichTextEditorField label={'Description'} />)

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
    })
})
