import { expect, userEvent, waitFor, within } from 'storybook/test'

/**
 * Exercises single-item expansion in the default playground.
 * @internal Storybook-only interaction; not part of the public package API.
 * @param context - Story canvas.
 * @param context.canvasElement - Mounted canvas element.
 * @returns Completion of the interaction assertions.
 * @example await playAccordion({ canvasElement })
 */
export const playAccordion = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    const canvas = within(canvasElement)
    await waitFor(async () => {
        await expect(canvas.getByRole('button', { name: 'Is it accessible?' })).toHaveAttribute('data-panel-open')
    })
    await userEvent.click(canvas.getByRole('button', { name: 'Is it styled?' }))
    await waitFor(async () => {
        await expect(canvas.getByRole('button', { name: 'Is it styled?' })).toHaveAttribute('data-panel-open')
        await expect(canvas.getByRole('button', { name: 'Is it accessible?' })).not.toHaveAttribute('data-panel-open')
    })
    await userEvent.click(canvas.getByRole('button', { name: 'Is it accessible?' }))
    await waitFor(async () => {
        await expect(canvas.getByRole('button', { name: 'Is it accessible?' })).toHaveAttribute('data-panel-open')
    })
}
