import type { TableStoryArgs } from '@stories/data-display/table/types'
import { type StoryContext } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

export const playTableSortable = async ({ canvasElement, args }: StoryContext<TableStoryArgs>): Promise<void> => {
    const canvas = within(canvasElement)
    const head = canvas.getByRole('columnheader', { name: 'Amount' })
    await userEvent.click(head)
    await expect(head).toHaveAttribute('aria-sort', 'descending')
    await expect(args.onSort).toHaveBeenCalled()
}
