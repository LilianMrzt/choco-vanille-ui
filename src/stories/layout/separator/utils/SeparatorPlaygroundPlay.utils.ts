import { expect, within } from 'storybook/test'
import { Separator } from '@components/layout/separator'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Separator Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: SeparatorPlaygroundPlay }
 */
const SeparatorPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Separator>>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('separator')).toBeInTheDocument()
}

export default SeparatorPlaygroundPlay
