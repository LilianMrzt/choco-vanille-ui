import { expect, within } from 'storybook/test'

/** Checks the standalone toggle name. @internal Not part of the public package API. */
export const playTogglePlayground = async ({ canvasElement, args }: Readonly<{
    canvasElement: HTMLElement
    args: Readonly<{ label?: string }>
}>): Promise<void> => {
    await expect(within(canvasElement).getByRole('button', { name: args.label })).toBeInTheDocument()
}
