import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { composeStory } from '@storybook/react-vite'

import type { CheckboxProps } from '@components/forms/checkbox'
import type { NumberFieldProps } from '@components/forms/number-field'
import { RenderCheckboxPlayground } from '@stories/forms/checkbox/utils/RenderCheckboxPlayground.utils'
import { DEFAULT_ARGS as CHECKBOX_ARGS } from '@stories/forms/checkbox/constants'
import ControlledNumberField from '@stories/forms/number-field/components/controlled-number-field/ControlledNumberField'
import ImagePickerPlayground from '@stories/forms/image-picker/components/image-picker-playground-example/ImagePickerPlaygroundExample'
import { RenderCalendarPlayground } from '@stories/forms/calendar/utils/RenderCalendarPlayground.utils'
import RichTextPlayground from '@stories/forms/rich-text-editor/components/rich-text-playground/RichTextPlayground'
import type { RichTextValue } from '@components/forms/rich-text-editor'
import type { ReactElement } from 'react'
import autocompleteMeta, { Playground as autocompletePlayground } from '@stories/forms/autocomplete/Autocomplete.stories'
import textFieldMeta, { Playground as textFieldPlayground } from '@stories/forms/text-field/TextField.stories'

const controls = vi.hoisted(() => ({
    args: {} as Record<string, unknown>,
    updateArgs: vi.fn(),
    hooksAllowed: true,
}))

vi.mock('storybook/preview-api', () => ({
    useArgs: () => {
        if (!controls.hooksAllowed) {
            throw new Error('Preview hooks must run in the story function, not a nested JSX component.')
        }
        return [controls.args, controls.updateArgs]
    },
}))

const renderStory = <Args,>(story: (args: Args) => ReactElement, args: Args): ReactElement => {
    controls.hooksAllowed = true
    const element = story(args)
    controls.hooksAllowed = false
    return element
}

const geometryMocks = [
    { target: document, key: 'elementFromPoint', value: () => document.body },
    { target: HTMLElement.prototype, key: 'getClientRects', value: () => [] },
    { target: Text.prototype, key: 'getClientRects', value: () => [] },
    { target: Text.prototype, key: 'getBoundingClientRect', value: () => new DOMRect() },
    { target: Range.prototype, key: 'getClientRects', value: () => [] },
    { target: Range.prototype, key: 'getBoundingClientRect', value: () => new DOMRect() },
].map((mock) => ({ ...mock, original: Object.getOwnPropertyDescriptor(mock.target, mock.key) }))

beforeAll(() => {
    for (const mock of geometryMocks) {
        Object.defineProperty(mock.target, mock.key, { configurable: true, value: mock.value })
    }
})

afterAll(() => {
    for (const mock of geometryMocks) {
        if (mock.original) {
            Object.defineProperty(mock.target, mock.key, mock.original)
        } else {
            Reflect.deleteProperty(mock.target, mock.key)
        }
    }
})

describe('Controlled form playgrounds', () => {
    beforeEach(() => {
        controls.args = {}
        controls.updateArgs.mockClear()
        controls.hooksAllowed = true
    })

    it('runs the autocomplete play against the named input rather than its combobox trigger', async () => {
        controls.args = { ...autocompleteMeta.args }
        const Story = composeStory(autocompletePlayground, autocompleteMeta)
        const { container } = render(<Story />)

        // Base UI exposes the trigger as another combobox in the mobile browser.
        screen.getByRole('button', { name: 'Open options' }).setAttribute('role', 'combobox')
        expect(screen.getAllByRole('combobox')).toHaveLength(2)
        if (!Story.play) {
            throw new Error('The autocomplete playground requires a play function.')
        }
        await Story.play({ canvasElement: container })

        expect(screen.queryByRole('listbox')).toBeNull()
    })

    it('runs the text-field play with an aria-hidden required marker', async () => {
        controls.args = { ...textFieldMeta.args, required: true }
        const Story = composeStory(textFieldPlayground, textFieldMeta)
        const { container } = render(<Story required />)

        expect(screen.getByRole('textbox', { name: 'Email address' })).toBeTruthy()
        if (!Story.play) {
            throw new Error('The text-field playground requires a play function.')
        }
        await Story.play({ canvasElement: container })
    })

    it('preserves the checkbox details callback and honors cancellation', async () => {
        const onCheckedChange = vi.fn<NonNullable<CheckboxProps['onCheckedChange']>>((_checked, details) => details.cancel())
        controls.args = { ...CHECKBOX_ARGS, label: 'Accept', checked: false, onCheckedChange }
        render(renderStory(RenderCheckboxPlayground, CHECKBOX_ARGS))

        await userEvent.click(screen.getByRole('checkbox', { name: 'Accept' }))

        expect(onCheckedChange).toHaveBeenCalledWith(true, expect.objectContaining({ isCanceled: true }))
        expect(controls.updateArgs).not.toHaveBeenCalled()
    })

    it('synchronizes the single rich-text field with Controls and its callback', async () => {
        const initialValue: RichTextValue = { type: 'doc', content: [{ type: 'paragraph' }] }
        const onValueChange = vi.fn()
        controls.args = { label: 'Description', value: initialValue, onValueChange }
        const { rerender } = render(renderStory(RichTextPlayground, undefined))
        const editor = screen.getByRole('textbox', { name: 'Description' })

        expect(screen.getAllByRole('textbox')).toHaveLength(1)
        await userEvent.type(editor, 'A')
        expect(onValueChange).toHaveBeenCalled()
        expect(controls.updateArgs).toHaveBeenCalledWith({ value: expect.objectContaining({ type: 'doc' }) })

        const resetValue: RichTextValue = {
            type: 'doc',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Reset' }] }],
        }
        controls.args = { ...controls.args, value: resetValue }
        rerender(renderStory(RichTextPlayground, undefined))
        expect(screen.getByRole('textbox', { name: 'Description' }).textContent).toBe('Reset')
    })

    it('forwards numeric callback details and updates Controls in both directions', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>()
        controls.args = { label: 'Quantity', value: 2, onValueChange }
        const { rerender } = render(<ControlledNumberField {...controls.args} />)

        await userEvent.click(screen.getByRole('button', { name: 'Increase' }))

        expect(onValueChange).toHaveBeenCalledWith(3, expect.objectContaining({ isCanceled: false }))
        expect(controls.updateArgs).toHaveBeenCalledWith({ value: 3 })

        controls.args = { ...controls.args, value: 8 }
        rerender(<ControlledNumberField {...controls.args} />)
        expect(screen.getByRole<HTMLInputElement>('textbox', { name: 'Quantity' }).value).toBe('8')
    })

    it('updates the image value arg on upload and clears it when Controls resets', async () => {
        const onValueChange = vi.fn()
        controls.args = { label: 'Avatar', value: null, onValueChange }
        const { container, rerender } = render(<ImagePickerPlayground {...controls.args} />)
        const input = container.querySelector('input[type="file"]')
        if (!(input instanceof HTMLInputElement)) {
            throw new Error('The image file input was not rendered.')
        }
        const file = new File(['image'], 'avatar.png', { type: 'image/png' })
        await userEvent.upload(input, file)

        expect(onValueChange).toHaveBeenCalledWith(file)
        expect(controls.updateArgs).toHaveBeenCalledWith({ value: file })

        controls.args = { ...controls.args, value: 'https://example.com/avatar.png' }
        rerender(<ImagePickerPlayground {...controls.args} />)
        expect(screen.getByRole('img').getAttribute('src')).toBe('https://example.com/avatar.png')

        controls.args = { ...controls.args, value: null }
        rerender(<ImagePickerPlayground {...controls.args} />)
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('preserves the complete calendar selection payload and synchronizes selected dates', async () => {
        const onSelect = vi.fn()
        const month = new Date(2026, 10, 1)
        controls.args = { mode: 'single', defaultMonth: month, onSelect }
        const { rerender } = render(renderStory(RenderCalendarPlayground, {}))
        const grid = screen.getByRole('grid')
        const day = grid.querySelector('button')
        if (!(day instanceof HTMLButtonElement)) {
            throw new Error('The calendar day button was not rendered.')
        }

        await userEvent.click(day)

        expect(onSelect).toHaveBeenCalledWith(expect.any(Date), expect.any(Date), expect.any(Object), expect.objectContaining({ type: 'click' }))
        expect(controls.updateArgs).toHaveBeenCalledWith({ selected: expect.any(Date) })

        controls.args = { ...controls.args, selected: new Date(2026, 10, 15) }
        rerender(renderStory(RenderCalendarPlayground, {}))
        expect(screen.getByRole('grid').querySelector('[aria-selected="true"]')).toBeTruthy()
    })

    it('synchronizes the standalone checkbox with accepted Controls changes', async () => {
        const onCheckedChange = vi.fn<NonNullable<CheckboxProps['onCheckedChange']>>()
        controls.args = { ...CHECKBOX_ARGS, onCheckedChange }
        const { rerender } = render(renderStory(RenderCheckboxPlayground, CHECKBOX_ARGS))

        await userEvent.click(screen.getByRole('checkbox', { name: 'Accept terms and conditions' }))

        expect(onCheckedChange).toHaveBeenCalledWith(true, expect.objectContaining({ isCanceled: false }))
        expect(controls.updateArgs).toHaveBeenCalledWith({ checked: true })

        controls.args = { ...controls.args, checked: true }
        rerender(renderStory(RenderCheckboxPlayground, CHECKBOX_ARGS))

        expect(screen.getByRole('checkbox', { name: 'Accept terms and conditions' }).getAttribute('aria-checked')).toBe('true')
        expect(screen.getAllByRole('checkbox')).toHaveLength(1)
    })
})
