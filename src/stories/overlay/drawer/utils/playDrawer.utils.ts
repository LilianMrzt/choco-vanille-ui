import { expect, userEvent, waitFor, within } from 'storybook/test'

/**
 * Checks portal opening and dismissal using accessible names.
 * @internal Storybook-only interaction; not part of the public package API.
 * @param context - Story canvas context.
 * @param context.canvasElement - Mounted canvas.
 * @returns Completion of the interaction.
 * @example await playDrawer({ canvasElement })
 */
export const playDrawer = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }))
    await waitFor(() => expect(body.getByRole('dialog')).toBeInTheDocument())
    await expect(body.getByRole('navigation', { name: 'Main navigation' })).toHaveTextContent('Dashboard')
    await userEvent.click(body.getByRole('button', { name: 'Close drawer' }))
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
}
