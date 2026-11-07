import type { Decorator } from '@storybook/react-vite'
import type { CheckboxProps } from '@components/forms/checkbox'

/**
 * Provides readable responsive framing.
 * @internal Not part of the public package API.
 * @param Story - Story renderer.
 * @returns The framed story.
 */
export const CheckboxFrame: Decorator<CheckboxProps> = (Story) => (
    <div style={{ width: 'min(100%, 24rem)' }}>
        <Story />
    </div>
)
