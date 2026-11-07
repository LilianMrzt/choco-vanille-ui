import { expect, within } from 'storybook/test'

/** Checks the controlled accessible name. @internal Not part of the public package API. */
export const playIconButtonPlayground = async ({ canvasElement, args }: Readonly<{
    canvasElement: HTMLElement
    args: Readonly<{ 'aria-label': string }>
}>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(
        canvas.getByRole('button', { name: args['aria-label'] }),
    ).toBeInTheDocument()
}
