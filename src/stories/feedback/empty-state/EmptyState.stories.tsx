import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmptyState } from '@components/feedback/empty-state'
import EmptyStateDocsPage from '@stories/feedback/empty-state/components/empty-state-docs-page/EmptyStateDocsPage'
import EmptyStatePlayground from '@stories/feedback/empty-state/components/empty-state-playground/EmptyStatePlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/empty-state/constants'
import type { EmptyStateStoryArgs } from '@stories/feedback/empty-state/types'
import { createEmptyStateSource } from '@stories/feedback/empty-state/utils/create-empty-state-source/createEmptyStateSource.utils'

const meta = {
    title: 'Feedback/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    render: (args) => <EmptyStatePlayground {...args} />,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'An empty result state for lists and tables. It presents a title, supporting description, and an optional action.',
            },
            page: EmptyStateDocsPage,
            source: {
                type: 'dynamic',
                transform: createEmptyStateSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<EmptyStateStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithoutAction: Story = {
    args: {
        showAction: false,
    },
}
