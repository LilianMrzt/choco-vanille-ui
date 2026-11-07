import { expect, within } from 'storybook/test'

/** Checks the standalone toggle name. @internal Not part of the public package API. */
export const playTogglePlayground = async ({ canvasElement, args }: Readonly<{
    canvasElement: HTMLElement
    args: Readonly<{ label?: string }>
}>): Promise<void> => {
    const standalone = within(within(canvasElement).getByRole('region', { name: 'Standalone' }))
    await expect(standalone.getByRole('button', { name: args.label })).toBeInTheDocument()
}
