import type { TableStoryArgs } from '@stories/data-display/table/types'
import { type StoryContext } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

export const playTableSortable = async ({ canvasElement }: StoryContext<TableStoryArgs>): Promise<void> => {
    const canvas = within(canvasElement)
    const head = canvas.getByRole('columnheader', { name: 'Amount' })
    await userEvent.click(head)
    await waitFor(() => expect(canvas.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'descending'))
}
