import { expect, within } from 'storybook/test'
import { Flex } from '@components/layout/flex'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Flex Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: FlexPlaygroundPlay }
 */
const FlexPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Flex>>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Item 1')).toBeInTheDocument()
}

export default FlexPlaygroundPlay
