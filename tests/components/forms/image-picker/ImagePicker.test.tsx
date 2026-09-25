import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
    ImagePicker,
    IMAGE_PICKER_STYLES,
} from '@components/forms/image-picker'

const getFileInput = (): HTMLInputElement =>
  document.querySelector('input[type="file"]') as HTMLInputElement

const createImageFile = (name = 'photo.png'): File =>
    new File(['image-data'], name, { type: 'image/png' })

const stubObjectUrl = (url = 'blob:photo') => {
    const createObjectURL = vi.fn().mockReturnValue(url)
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })
    return { createObjectURL, revokeObjectURL }
}

describe('ImagePicker', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    it('names the picker button with its label and current action', () => {
        render(<ImagePicker label={'Profile picture'} />)

        expect(
            screen.getByRole('button', { name: 'Profile picture Choose image' }),
        ).toBeTruthy()
        expect(
            screen.getByText('Drag an image here or click to browse'),
        ).toBeTruthy()
        expect(getFileInput().accept).toBe('image/*')
    })

    it('switches the action name to change when an image is selected', () => {
        render(
            <ImagePicker
                label={'Profile picture'}
                defaultValue={'https://example.com/profile.png'}
            />,
        )

        expect(
            screen.getByRole('button', { name: 'Profile picture Change image' }),
        ).toBeTruthy()
        expect(screen.getByRole('img').getAttribute('alt')).toBe('Profile picture')
    })

    it('uses aria-label on the picker button instead of the root', () => {
        const ref = createRef<HTMLDivElement>()

        render(
            <ImagePicker
                ref={ref}
                aria-label={'Avatar'}
                aria-labelledby={'external-label'}
                aria-describedby={'external-description'}
                aria-invalid
            />,
        )

        expect(screen.getByRole('button', { name: 'Avatar' })).toBeTruthy()
        expect(ref.current!.getAttribute('aria-label')).toBeNull()
        expect(ref.current!.getAttribute('aria-labelledby')).toBeNull()
        expect(ref.current!.getAttribute('aria-describedby')).toBeNull()
        expect(ref.current!.getAttribute('aria-invalid')).toBeNull()
    })

    it('forwards dimensions to the wrapper and preview surface', () => {
        const ref = createRef<HTMLDivElement>()

        render(
            <ImagePicker
                ref={ref}
                label={'Cover image'}
                width={'20rem'}
                height={'12rem'}
                aspectRatio={'16 / 9'}
            />,
        )

        expect(ref.current!.style.width).toBe('20rem')
        const preview = ref.current!.querySelector(
            '[data-has-value]',
        ) as HTMLElement
        expect(preview.style.height).toBe('12rem')
        expect(preview.style.aspectRatio).toBe('16 / 9')
    })

    it('ignores height and aspectRatio for the circle shape', () => {
        const ref = createRef<HTMLDivElement>()

        render(
            <ImagePicker
                ref={ref}
                label={'Profile picture'}
                shape={'circle'}
                height={'12rem'}
                aspectRatio={'16 / 9'}
            />,
        )

        const preview = ref.current!.querySelector(
            '[data-has-value]',
        ) as HTMLElement
        expect(preview.style.height).toBe('')
        expect(preview.style.aspectRatio).toBe('')
    })

    it.each(['square', 'rounded', 'circle'] as const)(
        'applies the %s shape to the clickable preview',
        (shape) => {
            render(
                <ImagePicker
                    label={'Profile picture'}
                    defaultValue={'https://example.com/profile.png'}
                    shape={shape}
                />,
            )

            const preview = screen.getByRole('button', { name: /Change image/ })

            expect(preview.className).toContain(
                IMAGE_PICKER_STYLES.preview({ shape }),
            )
            expect(preview.getAttribute('data-shape')).toBe(shape)
        },
    )

    it('renders a custom empty-state icon', () => {
        const CustomIcon = () => <svg data-testid={'custom-icon'} />

        render(<ImagePicker label={'Profile picture'} icon={CustomIcon} />)

        expect(screen.getByTestId('custom-icon')).toBeTruthy()
    })

    it('opens the file chooser when the preview is clicked', async () => {
        const click = vi.spyOn(HTMLInputElement.prototype, 'click')

        render(<ImagePicker label={'Profile picture'} />)
        await userEvent.click(screen.getByRole('button', { name: /Choose image/ }))

        expect(click).toHaveBeenCalledTimes(1)
    })

    it('accepts an image dropped on the preview on desktop', () => {
        const { createObjectURL } = stubObjectUrl('blob:dropped-photo')
        const file = createImageFile('dropped-photo.png')

        render(<ImagePicker label={'Profile picture'} />)
        fireEvent.drop(screen.getByRole('button', { name: /Choose image/ }), {
            dataTransfer: { files: [file] },
        })

        expect(createObjectURL).toHaveBeenCalledWith(file)
        expect(screen.getByRole('img').getAttribute('src')).toBe(
            'blob:dropped-photo',
        )
    })

    it('ignores non-file drags and child drag leaves', () => {
        render(<ImagePicker label={'Profile picture'} />)

        const preview = screen.getByRole('button', { name: /Choose image/ })
        fireEvent.dragOver(preview, {
            dataTransfer: { types: ['text/plain'], files: [] },
        })
        expect(preview.getAttribute('data-dragging')).toBe('false')

        fireEvent.dragOver(preview, {
            dataTransfer: { types: ['Files'], files: [] },
        })
        expect(preview.getAttribute('data-dragging')).toBe('true')

        fireEvent.dragLeave(preview.querySelector('span')!, {
            relatedTarget: preview.querySelector('span'),
        })
        expect(preview.getAttribute('data-dragging')).toBe('true')

        fireEvent.dragLeave(preview, { relatedTarget: document.body })
        expect(preview.getAttribute('data-dragging')).toBe('false')
    })

    it('shows a visible remove button on desktop and clears the value', async () => {
        const handleValueChange = vi.fn()

        render(
            <ImagePicker
                label={'Profile picture'}
                value={'https://example.com/profile.png'}
                onValueChange={handleValueChange}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Remove image' }))

        expect(handleValueChange).toHaveBeenCalledWith(null)
    })

    it('hides the remove action when clearable is false', () => {
        render(
            <ImagePicker
                label={'Profile picture'}
                defaultValue={'https://example.com/profile.png'}
                clearable={false}
            />,
        )

        expect(screen.queryByRole('button', { name: 'Remove image' })).toBeNull()
    })

    describe('isMobile', () => {
        it('renders touch action buttons instead of the corner remove button', async () => {
            const user = userEvent.setup()
            const click = vi.spyOn(HTMLInputElement.prototype, 'click')

            render(
                <ImagePicker
                    label={'Profile picture'}
                    defaultValue={'https://example.com/profile.png'}
                    isMobile
                />,
            )

            await user.click(screen.getByRole('button', { name: 'Change image' }))
            expect(click).toHaveBeenCalledTimes(1)

            await user.click(screen.getByRole('button', { name: 'Remove image' }))
            expect(screen.queryByRole('img')).toBeNull()
            expect(screen.getByRole('button', { name: 'Choose image' })).toBeTruthy()
            expect(screen.queryByRole('button', { name: 'Remove image' })).toBeNull()
        })

        it('uses the mobile empty hint and ignores drops', () => {
            const { createObjectURL } = stubObjectUrl()

            render(<ImagePicker label={'Profile picture'} isMobile />)
            expect(screen.getByText('Tap to choose an image')).toBeTruthy()

            fireEvent.drop(
                screen.getByRole('button', { name: 'Profile picture Choose image' }),
                { dataTransfer: { files: [createImageFile()] } },
            )

            expect(createObjectURL).not.toHaveBeenCalled()
        })
    })

    it('updates uncontrolled state and creates a preview after selecting an image', async () => {
        const { createObjectURL } = stubObjectUrl()
        const file = createImageFile()

        render(<ImagePicker label={'Cover image'} />)
        await userEvent.upload(getFileInput(), file)

        expect(createObjectURL).toHaveBeenCalledWith(file)
        expect(screen.getByRole('img').getAttribute('src')).toBe('blob:photo')
    })

    it('calls onValueChange with the selected file in controlled mode', async () => {
        const handleValueChange = vi.fn()
        const file = createImageFile()

        render(
            <ImagePicker
                label={'Cover image'}
                value={null}
                onValueChange={handleValueChange}
            />,
        )
        await userEvent.upload(getFileInput(), file)

        expect(handleValueChange).toHaveBeenCalledWith(file)
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('rejects files outside accept and reports the reason', async () => {
        const handleValidationError = vi.fn()
        const invalidFile = new File(['text'], 'notes.txt', { type: 'text/plain' })

        render(
            <ImagePicker
                label={'Cover image'}
                onValidationError={handleValidationError}
            />,
        )
        await userEvent.upload(getFileInput(), invalidFile, { applyAccept: false })

        expect(handleValidationError).toHaveBeenCalledWith({
            reason: 'invalidType',
            file: invalidFile,
        })
        expect(screen.getByRole('alert').textContent).toBe('Choose an image file.')
        expect(screen.queryByRole('img')).toBeNull()
        expect(getFileInput().files).toHaveLength(0)
    })

    it('rejects images that exceed maxSize', async () => {
        const handleValidationError = vi.fn()
        const file = createImageFile()

        render(
            <ImagePicker
                label={'Cover image'}
                maxSize={1}
                onValidationError={handleValidationError}
            />,
        )
        await userEvent.upload(getFileInput(), file)

        expect(handleValidationError).toHaveBeenCalledWith({
            reason: 'maxSize',
            file,
            maxSize: 1,
        })
        expect(screen.getByRole('alert').textContent).toBe(
            'This image is too large.',
        )
        expect(getFileInput().files).toHaveLength(0)
    })

    it('keeps the current file when opening and cancelling the chooser', async () => {
        const file = createImageFile()
        const click = vi.spyOn(HTMLInputElement.prototype, 'click')

        render(<ImagePicker label={'Cover image'} />)
        await userEvent.upload(getFileInput(), file)
        await userEvent.click(screen.getByRole('button', { name: /Change image/ }))

        expect(click).toHaveBeenCalledTimes(1)
        expect(getFileInput().files?.[0]).toBe(file)
    })

    it('connects helper and error text to the picker button', () => {
        render(
            <ImagePicker label={'Cover image'} error={'Please choose an image.'} />,
        )

        const button = screen.getByRole('button', { name: /Cover image/ })
        const helper = screen.getByRole('alert')
        expect(button.getAttribute('data-has-error')).toBe('true')
        expect(button.getAttribute('aria-invalid')).toBe('true')
        expect(getFileInput().getAttribute('aria-invalid')).toBeNull()
        expect(getFileInput().getAttribute('aria-describedby')).toBeNull()
        expect(button.getAttribute('aria-describedby')).toContain(helper.id)
        expect(helper.textContent).toBe('Please choose an image.')
    })

    it('only requires the native input while no image is selected', () => {
        const { rerender } = render(
            <ImagePicker label={'Avatar'} required value={null} />,
        )
        expect(getFileInput().required).toBe(true)

        rerender(
            <ImagePicker
                label={'Avatar'}
                required
                value={'https://example.com/profile.png'}
            />,
        )
        expect(getFileInput().required).toBe(false)
    })

    it('does not open the picker or remove the image when disabled', () => {
        const click = vi.spyOn(HTMLInputElement.prototype, 'click')

        render(
            <ImagePicker
                label={'Cover image'}
                defaultValue={'https://example.com/profile.png'}
                disabled
            />,
        )
        fireEvent.click(document.querySelector('[data-has-value]')!)

        expect(click).not.toHaveBeenCalled()
        expect(getFileInput().disabled).toBe(true)
        expect(
            (
                screen.getByRole('button', {
                    name: 'Remove image',
                }) as HTMLButtonElement
            ).disabled,
        ).toBe(true)
    })

    it('can disable the change action without disabling remove', async () => {
        const click = vi.spyOn(HTMLInputElement.prototype, 'click')
        const handleValueChange = vi.fn()

        render(
            <ImagePicker
                label={'Cover image'}
                defaultValue={'https://example.com/profile.png'}
                disableChange
                onValueChange={handleValueChange}
            />,
        )

        const preview = screen.getByRole('button', { name: /Change image/ })
        expect((preview as HTMLButtonElement).disabled).toBe(true)
        expect(getFileInput().disabled).toBe(true)

        await userEvent.click(preview)
        expect(click).not.toHaveBeenCalled()

        await userEvent.click(screen.getByRole('button', { name: 'Remove image' }))
        expect(handleValueChange).toHaveBeenCalledWith(null)
    })

    it.each([false, true] as const)(
        'can disable remove without disabling the change action on %s layout',
        async (isMobile) => {
            const click = vi.spyOn(HTMLInputElement.prototype, 'click')

            render(
                <ImagePicker
                    label={'Cover image'}
                    defaultValue={'https://example.com/profile.png'}
                    disableRemove
                    isMobile={isMobile}
                />,
            )

            const changeButton = isMobile
                ? screen.getByRole('button', { name: 'Change image' })
                : screen.getByRole('button', { name: /Change image/ })
            expect((changeButton as HTMLButtonElement).disabled).toBe(false)
            expect(
                (screen.getByRole('button', {
                    name: 'Remove image',
                }) as HTMLButtonElement).disabled,
            ).toBe(true)

            await userEvent.click(changeButton)
            expect(click).toHaveBeenCalledTimes(1)
        },
    )

    it('combines the global and action-specific disabled states', () => {
        render(
            <ImagePicker
                label={'Cover image'}
                defaultValue={'https://example.com/profile.png'}
                disabled
                disableChange={false}
                disableRemove={false}
            />,
        )

        expect(
            (screen.getByRole('button', {
                name: /Change image/,
            }) as HTMLButtonElement).disabled,
        ).toBe(true)
        expect(
            (screen.getByRole('button', {
                name: 'Remove image',
            }) as HTMLButtonElement).disabled,
        ).toBe(true)
        expect(getFileInput().disabled).toBe(true)
    })
})
