import { expect } from 'storybook/test'
import type { TypographyStoryArgs } from '@stories/foundation/typography/types'
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
const TypographyPlaygroundPlay = async ({
    canvasElement,
}: StoryContext<TypographyStoryArgs>): Promise<void> => {
    await expect(canvasElement.firstElementChild).toBeInTheDocument()
}

export default TypographyPlaygroundPlay
