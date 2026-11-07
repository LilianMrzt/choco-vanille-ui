import { expect, userEvent, waitFor, within } from 'storybook/test'

/**
 * Checks selection updates through named links.
 * @internal Storybook-only interaction; not part of the public package API.
 * @param context - Canvas context.
 * @param context.canvasElement - Mounted canvas.
 * @returns Completion of the assertions.
 * @example await playNavigation({ canvasElement })
 */
export const playNavigation = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    const canvas = within(canvasElement)
    await waitFor(async () => {
        await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    })
    await userEvent.click(canvas.getByRole('link', { name: 'Search' }))
    await waitFor(async () => {
        await expect(canvas.getByRole('link', { name: 'Search' })).toHaveAttribute('aria-current', 'page')
        await expect(canvas.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    })
}

/**
 * Checks that a consumer routing callback also updates selection.
 * @internal Storybook-only interaction; not part of the public package API.
 * @param context - Canvas context.
 * @param context.canvasElement - Mounted canvas.
 * @returns Completion of the assertions.
 * @example await playClientSideNavigation({ canvasElement })
 */
export const playClientSideNavigation = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('link', { name: 'Search' }))
    await waitFor(async () => {
        await expect(canvas.getByRole('link', { name: 'Search' })).toHaveAttribute('aria-current', 'page')
        await expect(canvas.getByText('Current route: /search')).toBeInTheDocument()
    })
}
