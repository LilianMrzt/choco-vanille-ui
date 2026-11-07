import { type ComponentProps } from 'react'
import { expect, within } from 'storybook/test'
import { TimePicker } from '@components/forms/time-picker'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the TimePicker Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playTimePickerPlayground: NonNullable<StoryObj<ComponentProps<typeof TimePicker>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = args.label as string | undefined
    if (label) {
        await expect(canvas.getByLabelText(label)).toBeInTheDocument()
    }
}
