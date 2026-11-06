import { expect } from 'storybook/test'
import { Box } from '@components/layout/box'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Box Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: BoxPlaygroundPlay }
 */
const BoxPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Box>>): Promise<void> => {
    await expect(canvasElement.firstElementChild).toBeInTheDocument()
}

export default BoxPlaygroundPlay
