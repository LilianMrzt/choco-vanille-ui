import { expect, userEvent, waitFor, within } from 'storybook/test'

/**
 * Opens and dismisses the default sheet.
 * @internal Storybook-only interaction; not part of the public package API.
 * @param context - Story canvas context.
 * @param context.canvasElement - Mounted canvas.
 * @returns Completion of the interaction.
 * @example await playBottomSheet({ canvasElement })
 */
export const playBottomSheet = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open bottom sheet' }))
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(body.getByRole('dialog')).toBeInTheDocument())
    await expect(body.getByRole('dialog')).toHaveTextContent('Photo')
    await userEvent.keyboard('{Escape}')
}
