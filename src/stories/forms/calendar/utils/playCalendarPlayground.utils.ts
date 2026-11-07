import { expect, within } from 'storybook/test'
import type { CalendarArgs } from '@stories/forms/calendar/types'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the Calendar Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playCalendarPlayground: NonNullable<StoryObj<CalendarArgs>['play']> = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('grid')).toBeInTheDocument()
}
