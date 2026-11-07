import { expect, within } from 'storybook/test'
import type { CheckboxProps } from '@components/forms/checkbox'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the Checkbox Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playCheckboxPlayground: NonNullable<StoryObj<CheckboxProps>['play']> = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeInTheDocument()
}
