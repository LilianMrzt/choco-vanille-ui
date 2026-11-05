import type { TableStoryArgs } from '@stories/data-display/table/types'
import { type StoryContext } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

export const playTableSelectableRows = async ({ canvasElement, args }: StoryContext<TableStoryArgs>): Promise<void> => {
    const canvas = within(canvasElement)
    const row = canvas.getByText('INV-002').closest('tr')
    if (row === null) {
        throw new Error('Invoice row is missing')
    }
    await userEvent.click(row)
    await expect(row).toHaveAttribute('aria-selected', 'true')
    await expect(args.onSelect).toHaveBeenCalled()
}
