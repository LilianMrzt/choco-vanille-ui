import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { RichTextEditor, type RichTextValue } from '@components/forms/rich-text-editor'
import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'

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
        expect(screen.getByRole('button', { name: 'Text size' })).toBeTruthy()
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

    it('supports classic keyboard undo and redo shortcuts', async () => {
        render(<RichTextEditor label={'Description'} />)

        const editor = screen.getByRole('textbox', { name: 'Description' })
        await userEvent.type(editor, 'Hello')
        await userEvent.keyboard('{Control>}z{/Control}')

        expect(editor.textContent).not.toContain('Hello')

        await userEvent.keyboard('{Control>}y{/Control}')

        expect(editor.textContent).toContain('Hello')
    })

    it('updates a formatting toggle before text is entered', async () => {
        render(<RichTextEditor label={'Description'} />)

        const boldToggle = screen.getByRole('button', { name: 'Bold' })
        await userEvent.click(boldToggle)

        expect(boldToggle.getAttribute('aria-pressed')).toBe('true')
    })

    it('exposes design-system colors', async () => {
        render(<RichTextEditor label={'Description'} />)

        await userEvent.click(screen.getByRole('button', { name: 'Text color' }))
        expect(screen.getAllByRole('group', { name: /text colors$/ })).toHaveLength(7)
        expect(screen.getByRole('button', { name: 'Ocean 1 text color' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Black 1 text color' })).toBeTruthy()
    })

    it('exposes the complete text size palette', async () => {
        render(<RichTextEditor label={'Description'} />)

        const textSizeButton = screen.getByRole('button', { name: 'Text size' })
        await userEvent.click(textSizeButton)

        await waitFor(() => {
            expect(screen.getByRole('menuitemradio', { name: '2xs' })).toBeTruthy()
            expect(screen.getByRole('menuitemradio', { name: '6xl' })).toBeTruthy()
            expect(screen.getByRole('menuitemradio', { name: 'sm' }).getAttribute('aria-checked')).toBe('true')
        })

    })

    it('shows the selected color and supports arrow navigation', async () => {
        render(
            <RichTextEditor
                label={'Description'}
                defaultValue={{
                    type: 'doc',
                    content: [{
                        type: 'paragraph',
                        content: [{
                            type: 'text',
                            text: 'Colored text',
                            marks: [{
                                type: 'textStyle',
                                attrs: { color: '#3b82f6' },
                            }],
                        }],
                    }],
                }}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Text color' }))

        const selectedColor = screen.getByRole('button', { name: 'Ocean 2 text color' })
        expect(selectedColor.getAttribute('data-selected')).toBe('true')
        expect(selectedColor.querySelector('[aria-hidden="true"]')).toBeTruthy()

        const firstColor = screen.getByRole('button', { name: 'Ocean 1 text color' })
        firstColor.focus()
        fireEvent.keyDown(firstColor, { key: 'ArrowRight' })

        const nextColor = screen.getByRole('button', { name: 'Forest 1 text color' })
        expect(document.activeElement).toBe(nextColor)

        await userEvent.keyboard('{Enter}')

        expect(screen.queryByRole('dialog', { name: 'Text color palette' })).toBeNull()
    })

    it('reflects the selected text size', async () => {
        render(
            <RichTextEditor
                label={'Description'}
                defaultValue={{
                    type: 'doc',
                    content: [{
                        type: 'paragraph',
                        content: [{
                            type: 'text',
                            text: 'Large text',
                            marks: [{
                                type: 'textStyle',
                                attrs: { fontSize: RICH_TEXT_FONT_SIZES['2xl'] },
                            }],
                        }],
                    }],
                }}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Text size' }))

        await waitFor(() => {
            expect(screen.getByRole('menuitemradio', { name: '2xl' }).getAttribute('aria-checked')).toBe('true')
        })
    })

    it('recognizes a safe URL when it is pasted', async () => {
        const onValueChange = vi.fn()
        render(
            <RichTextEditor
                label={'Description'}
                onValueChange={onValueChange}
            />,
        )

        await userEvent.click(screen.getByRole('textbox', { name: 'Description' }))
        await userEvent.paste('https://example.com')

        expect(onValueChange.mock.calls.at(-1)?.[0]).toMatchObject({
            content: [{
                content: [{
                    text: 'https://example.com',
                    marks: [{
                        type: 'link',
                        attrs: { href: 'https://example.com' },
                    }],
                }],
            }],
        })
    })

    it('recognizes a safe URL when it is typed', async () => {
        const onValueChange = vi.fn()
        render(
            <RichTextEditor
                label={'Description'}
                onValueChange={onValueChange}
            />,
        )

        await userEvent.type(screen.getByRole('textbox', { name: 'Description' }), 'https://example.com ')

        const latestValue = onValueChange.mock.calls.at(-1)?.[0] as RichTextValue | undefined
        const firstNode = latestValue?.content?.[0]

        if (!firstNode || firstNode.type === 'text') {
            throw new Error('The editor must emit a paragraph containing the typed URL.')
        }

        expect(firstNode.content).toEqual(expect.arrayContaining([
            expect.objectContaining({
                text: 'https://example.com',
                marks: [expect.objectContaining({
                    type: 'link',
                    attrs: expect.objectContaining({ href: 'https://example.com' }),
                })],
            }),
        ]))
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
