import type { Decorator } from '@storybook/react-vite'
import type { RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'
/**
 * Provides readable responsive framing.
 * @internal Not part of the public package API.
 * @param Story - Story renderer.
 * @returns The framed story.
 */
export const RadioGroupFrame: Decorator<RadioGroupPlaygroundArgs> = (Story) => (
    <div style={{ width: 'min(100%, 24rem)' }}>
        <Story />
    </div>
)
