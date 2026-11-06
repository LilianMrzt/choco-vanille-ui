import { expect } from 'storybook/test'
import { Typography } from '@/components/foundation/typography'

import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Typography Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: TypographyPlaygroundPlay }
 */
const TypographyPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Typography>>): Promise<void> => {
    await expect(canvasElement.firstElementChild).toBeInTheDocument()
}

export default TypographyPlaygroundPlay
