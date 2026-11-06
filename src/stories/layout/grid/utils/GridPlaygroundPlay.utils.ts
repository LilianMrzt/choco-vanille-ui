import { expect, within } from 'storybook/test'
import { Grid } from '@components/layout/grid'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Grid Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: GridPlaygroundPlay }
 */
const GridPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Grid>>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Cell 1')).toBeInTheDocument()
}

export default GridPlaygroundPlay
