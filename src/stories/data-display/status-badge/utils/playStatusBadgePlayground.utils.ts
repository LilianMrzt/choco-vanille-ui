import {
    type StatusBadgeProps
} from '@components/data-display/status-badge'
import { type StoryContext } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

export const playStatusBadgePlayground = async ({ canvasElement }: StoryContext<StatusBadgeProps>): Promise<void> => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('JD')).toBeInTheDocument()
}
