import { expect } from 'storybook/test'
import { SvgImage } from '@components/layout/svg-image'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the SvgImage Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: SvgImagePlaygroundPlay }
 */
const SvgImagePlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof SvgImage>>): Promise<void> => {
    await expect(canvasElement.querySelector('svg')).toBeInTheDocument()
}

export default SvgImagePlaygroundPlay
