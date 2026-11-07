import type { TableStoryArgs } from '@stories/data-display/table/types'
import { type StoryContext } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

export const playTableSelectableRows = async ({ canvasElement }: StoryContext<TableStoryArgs>): Promise<void> => {
    const canvas = within(canvasElement)
    const row = canvas.getByText('INV-002').closest('tr')
    if (row === null) {
        throw new Error('Invoice row is missing')
    }
    await userEvent.click(row)
    await waitFor(() => expect(canvas.getByText('INV-002').closest('tr')).toHaveAttribute('aria-selected', 'true'))
}
