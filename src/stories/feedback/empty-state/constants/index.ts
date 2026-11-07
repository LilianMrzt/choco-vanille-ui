import type { Meta } from '@storybook/react-vite'

import type { EmptyStateStoryArgs } from '@stories/feedback/empty-state/types'

export const DEFAULT_ARGS = {
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
    showAction: true,
} satisfies NonNullable<Meta<EmptyStateStoryArgs>['args']>

export const ARG_TYPES = {
    title: { control: 'text', description: 'Heading content.' },
    description: { control: 'text', description: 'Supporting paragraph content.' },
    showAction: { control: 'boolean', description: 'Demonstration control for showing the action.', table: { category: 'Composition' } },
    action: { control: false, description: 'React node; showAction displays a composed action in this example.' },
    className: { control: 'text', description: 'Additional root class.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the root div.' },
} satisfies NonNullable<Meta<EmptyStateStoryArgs>['argTypes']>
