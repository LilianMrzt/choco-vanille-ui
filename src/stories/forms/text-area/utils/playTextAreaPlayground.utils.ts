import { expect, within } from 'storybook/test'
import { TextArea } from '@components/forms/text-area'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the TextArea Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playTextAreaPlayground: NonNullable<StoryObj<import('react').ComponentProps<typeof TextArea>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = args.label as string | undefined
    if (label) {
        await expect(canvas.getByLabelText(label)).toBeInTheDocument()
    } else {
        await expect(canvas.getByRole('textbox')).toBeInTheDocument()
    }
}
