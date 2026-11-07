import { expect, within } from 'storybook/test'
import { TextField } from '@components/forms/text-field'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the TextField Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playTextFieldPlayground: NonNullable<StoryObj<import('react').ComponentProps<typeof TextField>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = args.label as string | undefined
    if (label) {
        await expect(canvas.getByRole('textbox', { name: label })).toBeInTheDocument()
    } else {
        await expect(canvas.getByRole('textbox')).toBeInTheDocument()
    }
}
