import { expect, within } from 'storybook/test'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the ImagePicker Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playImagePickerPlayground: NonNullable<StoryObj<ImagePickerStoryArgs>['play']> = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
        canvas.getByRole('button', { name: 'Cover image Choose image' }),
    ).toBeInTheDocument()
}
