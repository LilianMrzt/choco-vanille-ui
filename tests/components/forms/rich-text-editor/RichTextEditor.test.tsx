import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { RichTextEditor, type RichTextValue } from '@components/forms/rich-text-editor'

const INITIAL_VALUE: RichTextValue = {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Initial content' }] }],
}

const TWO_PARAGRAPHS_VALUE: RichTextValue = {
    type: 'doc',
    content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] },
    ],
}

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

describe('RichTextEditor', () => {
    it('renders a labelled editable document and its toolbar', () => {
        render(<RichTextEditor label={'Description'} />)

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
        expect(screen.queryByRole('button', { name: 'Undo' })).toBeNull()
        expect(screen.queryByRole('button', { name: 'Redo' })).toBeNull()
        expect(screen.getByRole('button', { name: 'Paragraph' }).getAttribute('aria-pressed')).toBeNull()
    })

    it('emits a versioned document after typing', async () => {
        const onValueChange = vi.fn()
        render(
            <RichTextEditor
                label={'Description'}
                onValueChange={onValueChange}
            />,
        )

        await userEvent.type(screen.getByRole('textbox', { name: 'Description' }), 'Hello')

        expect(onValueChange).toHaveBeenCalled()
        expect(onValueChange.mock.calls.at(-1)?.[0]).toMatchObject({
            type: 'doc',
        })
    })

    it('updates a formatting toggle before text is entered', async () => {
        render(<RichTextEditor label={'Description'} />)

        const boldToggle = screen.getByRole('button', { name: 'Bold' })
        await userEvent.click(boldToggle)

        expect(boldToggle.getAttribute('aria-pressed')).toBe('true')
    })

    it('keeps the editor focused in controlled mode after typing', async () => {
        const ControlledEditor = () => {
            const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)

            return (
                <RichTextEditor
                    label={'Description'}
                    value={value}
                    onValueChange={setValue}
                />
            )
        }

        render(<ControlledEditor />)

        const editor = screen.getByRole('textbox', { name: 'Description' })
        await userEvent.type(editor, '!')

        expect(document.activeElement).toBe(editor)
        expect(editor.textContent).toContain('!')
    })

    it('renders its initial uncontrolled document', () => {
        render(
            <RichTextEditor
                label={'Description'}
                defaultValue={INITIAL_VALUE}
            />,
        )

        expect(screen.getByText('Initial content')).toBeTruthy()
    })

    it('uses RichTextRenderer without editor controls when read-only', () => {
        render(
            <RichTextEditor
                label={'Description'}
                defaultValue={INITIAL_VALUE}
                readOnly
            />,
        )

        expect(screen.getByText('Initial content')).toBeTruthy()
        expect(screen.queryByRole('textbox')).toBeNull()
        expect(screen.queryByRole('toolbar')).toBeNull()
    })

    it('applies a heading only to the current block', async () => {
        render(
            <RichTextEditor
                label={'Description'}
                defaultValue={TWO_PARAGRAPHS_VALUE}
            />,
        )

        const firstParagraph = screen.getByText('First paragraph')
        const firstTextNode = firstParagraph.firstChild
        const selection = window.getSelection()
        const range = document.createRange()

        if (!firstTextNode || !selection) {
            throw new Error('The editor content must expose a selectable text node.')
        }

        range.setStart(firstTextNode, 0)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
        fireEvent(document, new Event('selectionchange'))

        await userEvent.click(screen.getByRole('button', { name: 'Heading 1' }))

        expect(screen.getByText('First paragraph').tagName).toBe('H1')
        expect(screen.getByText('Second paragraph').tagName).toBe('P')
    })

    it('disables formatting actions when disabled', () => {
        render(
            <RichTextEditor
                label={'Description'}
                disabled
            />,
        )

        expect((screen.getByRole('button', { name: 'Bold' }) as HTMLButtonElement).disabled).toBe(true)
    })

    it('connects error text to the editable document', () => {
        render(
            <RichTextEditor
                label={'Description'}
                error={'A description is required.'}
            />,
        )

        const editor = screen.getByRole('textbox', { name: 'Description' })
        expect(editor.getAttribute('aria-invalid')).toBe('true')
        expect(editor.getAttribute('aria-describedby')).toBeTruthy()
    })
})
