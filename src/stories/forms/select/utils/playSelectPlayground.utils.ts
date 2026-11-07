import { expect, screen, userEvent, waitFor, within } from 'storybook/test'
import { SelectField } from '@components/forms/select'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the Select Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playSelectPlayground: NonNullable<StoryObj<import('react').ComponentProps<typeof SelectField>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await expect(trigger).toBeInTheDocument()
    await expect(trigger).toHaveTextContent(args.placeholder ?? '')
    await userEvent.click(trigger)
    const listbox = await screen.findByRole('listbox')
    await expect(listbox).toBeInTheDocument()
    // Close the listbox so the a11y audit runs against a stable, valid DOM
    // The popup is portaled outside the story canvas.
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
}
