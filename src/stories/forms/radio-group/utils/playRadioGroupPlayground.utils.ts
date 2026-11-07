import { expect, within } from 'storybook/test'
import type { RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the RadioGroup Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playRadioGroupPlayground: NonNullable<StoryObj<RadioGroupPlaygroundArgs>['play']> = async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radios = canvas.getAllByRole('radio')
    await expect(radios).toHaveLength(3)
}
