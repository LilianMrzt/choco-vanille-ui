import { expect, within } from 'storybook/test'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the Checkbox Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playCheckboxPlayground: NonNullable<StoryObj<CheckboxStoryArgs>['play']> = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getAllByRole('checkbox')[0]
    await expect(checkbox).toBeInTheDocument()
}
