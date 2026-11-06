import { expect } from 'storybook/test'
import { Image } from '@components/data-display/image'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Image Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: ImagePlaygroundPlay }
 */
const ImagePlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Image>>): Promise<void> => {
    await expect(canvasElement.querySelector('img')).toBeInTheDocument()
}

export default ImagePlaygroundPlay
