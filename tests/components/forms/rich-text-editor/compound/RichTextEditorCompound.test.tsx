import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

// @ts-expect-error RichTextEditor is the compound root and requires explicit children.
const ROOT_WITHOUT_CHILDREN: RichTextEditorProps = { label: 'Description' }
void ROOT_WITHOUT_CHILDREN

import { RichTextEditor, RichTextEditorField, type RichTextEditorProps } from '@components/forms/rich-text-editor'

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

    it('keeps the compound editor named when the visible label slot is omitted', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
    })

    it('connects helper text when the compound composition includes the slot', () => {
        render(
            <RichTextEditor
                label={'Description'}
                error={'A description is required.'}
            >
                <RichTextEditor.EditorField />
                <RichTextEditor.HelperText />
            </RichTextEditor>,
        )

        const editor = screen.getByRole('textbox', { name: 'Description' })
        const helper = screen.getByRole('alert')

        expect(editor.getAttribute('aria-describedby')).toBe(helper.id)
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

    it('renders menu-capable groups as direct toolbar actions', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.BlockFormatGroup presentation={'inline'} />
                    <RichTextEditor.ListsGroup presentation={'inline'} />
                    <RichTextEditor.AlignmentGroup presentation={'inline'} />
                    <RichTextEditor.ImageGroup presentation={'inline'} />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Heading 1' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Bulleted list' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Align center' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Insert image URL' })).toBeTruthy()
        expect(screen.queryByRole('button', { name: 'Block format' })).toBeNull()
        expect(screen.queryByRole('button', { name: 'Lists' })).toBeNull()
        expect(screen.queryByRole('button', { name: 'Text alignment' })).toBeNull()
        expect(screen.queryByRole('button', { name: 'Image actions' })).toBeNull()
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

    it('composes the read-only field and helper text slots', () => {
        render(
            <RichTextEditorField
                label={'Description'}
                defaultValue={{
                    type: 'doc',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Read-only content' }] }],
                }}
                readOnly
                helperText={'This content is not editable.'}
                name={'description'}
            />,
        )

        const renderer = screen.getByText('Read-only content')
        const helper = screen.getByRole('status')
        const submittedValue = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement

        expect(renderer).toBeTruthy()
        expect(renderer.closest('[aria-describedby]')).toBeTruthy()
        expect(helper.textContent).toContain('This content is not editable.')
        expect(submittedValue.required).toBe(false)
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
