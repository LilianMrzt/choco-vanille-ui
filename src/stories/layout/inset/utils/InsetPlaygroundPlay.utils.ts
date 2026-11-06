import { expect, within } from 'storybook/test'
import {
    Inset,
} from '@components/layout/inset'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Inset Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: InsetPlaygroundPlay }
 */
const InsetPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Inset>>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(canvas.getByAltText('An abstract circle illustration')).toBeInTheDocument()
}

export default InsetPlaygroundPlay
