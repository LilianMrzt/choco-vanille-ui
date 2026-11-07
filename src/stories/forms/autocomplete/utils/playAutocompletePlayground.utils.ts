import { expect, screen, userEvent, waitFor, within } from 'storybook/test'
import { AutocompleteField } from '@components/forms/autocomplete'
import type { StoryObj } from '@storybook/react-vite'

/**
 * Checks the Autocomplete Playground example.
 * @internal Not part of the public package API.
 * @param context - Storybook play context.
 * @returns The interaction promise.
 */
export const playAutocompletePlayground: NonNullable<StoryObj<import('react').ComponentProps<typeof AutocompleteField>>['play']> = async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox', { name: typeof args.label === 'string' ? args.label : '' })
    await expect(input).toBeInTheDocument()
    await expect(input).toHaveAttribute('placeholder', args.placeholder ?? '')
    await userEvent.click(input)
    const listbox = await screen.findByRole('listbox')
    await expect(listbox).toBeInTheDocument()
    // Close the listbox so the a11y audit runs against a stable, valid DOM.
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
}
