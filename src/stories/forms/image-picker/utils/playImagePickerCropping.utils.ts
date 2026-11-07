import { expect, userEvent, within } from 'storybook/test'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the ImagePicker Cropping example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playImagePickerCropping: NonNullable<StoryObj<ImagePickerStoryArgs>['play']> = async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input[type="file"]')

    if (!(input instanceof HTMLInputElement)) {
        throw new Error('The ImagePicker file input was not rendered.')
    }

    await userEvent.upload(
        input,
        new File(['image-data'], 'profile-picture.png', {
            type: 'image/png',
        }),
    )

    await expect(
        within(document.body).getByRole('dialog', { name: 'Crop image' }),
    ).toBeInTheDocument()
}
