import type { Decorator } from '@storybook/react-vite'
import type { CalendarArgs } from '@stories/forms/calendar/types'
/**
 * Provides readable responsive framing.
 * @internal Not part of the public package API.
 * @param Story - Story renderer.
 * @returns The framed story.
 */
export const CalendarFrame: Decorator<CalendarArgs> = (Story) => (
    <div style={{ width: 'min(100%, 24rem)' }}>
        <Story />
    </div>
)
