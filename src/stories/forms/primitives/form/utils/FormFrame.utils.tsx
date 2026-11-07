import type { Decorator } from '@storybook/react-vite'
import { Form } from '@components/forms/primitives/form'

/**
 * Provides readable responsive framing.
 * @internal Not part of the public package API.
 * @param Story - Story renderer.
 * @returns The framed story.
 */
export const FormFrame: Decorator<import('react').ComponentProps<typeof Form>> = (Story) => (
    <div style={{ width: '320px' }}>
        <Story />
    </div>
)
