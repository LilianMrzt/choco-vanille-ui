import { type BadgeProps } from '@components/data-display/badge'
import { type StoryContext } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

export const playBadgePlayground = async ({ canvasElement, args }: StoryContext<BadgeProps>): Promise<void> => {
    await expect(within(canvasElement).getByText(args.label)).toBeInTheDocument()
}
