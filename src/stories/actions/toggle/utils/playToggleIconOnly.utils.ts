import { expect, within } from 'storybook/test'

/** Checks the icon-only name. @internal Not part of the public package API. */
export const playToggleIconOnly = async ({ canvasElement }: Readonly<{ canvasElement: HTMLElement }>): Promise<void> => {
    await expect(within(canvasElement).getByRole('button', { name: 'Bold' })).toBeInTheDocument()
}
