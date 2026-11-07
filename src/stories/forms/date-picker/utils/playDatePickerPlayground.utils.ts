import { type ComponentProps } from 'react'
import { expect, within } from 'storybook/test'
import { DatePicker } from '@components/forms/date-picker'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the DatePicker Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playDatePickerPlayground: NonNullable<StoryObj<ComponentProps<typeof DatePicker>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = args.label as string | undefined
    if (label) {
        await expect(canvas.getByRole('group', { name: label })).toBeInTheDocument()
    }
    await expect(canvas.getAllByRole('spinbutton').length).toBeGreaterThan(0)
}
