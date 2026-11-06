import type { Meta, StoryObj } from '@storybook/react-vite'

import { AvatarGroup, type AvatarGroupProps } from '@components/data-display/avatar-group'
import AvatarGroupDocsPage from '@stories/data-display/avatar-group/components/avatar-group-docs-page/AvatarGroupDocsPage'
import AvatarGroupPlayground from '@stories/data-display/avatar-group/components/avatar-group-playground/AvatarGroupPlayground'
import AvatarGroupSpacing from '@stories/data-display/avatar-group/components/avatar-group-spacing/AvatarGroupSpacing'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/avatar-group/constants'
import { createAvatarGroupSpacingSource } from '@stories/data-display/avatar-group/utils/create-avatar-group-spacing-source/createAvatarGroupSpacingSource.utils'
import { createGroupSource } from '@stories/data-display/avatar-group/utils/create-group-source/createGroupSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Data Display/AvatarGroup',
    component: AvatarGroup,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: AvatarGroupDocsPage,
            description: { component: 'Stacks avatars with configurable overlap. Limit the visible children with `max` to display an additional, accessibly named overflow avatar.' },
            source: {
                type: 'dynamic',
                transform: (_source: string, { args }: { args: AvatarGroupProps }) => createGroupSource(args),
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    render: AvatarGroupPlayground,
} satisfies Meta<typeof AvatarGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithMax: Story = {
    args: { max: 3 },
}

export const OverflowOnly: Story = {
    args: { max: 0 },
    parameters: { docs: { description: { story: 'Zero shows only the count indicator, without a leading overlap offset.' } } },
}

export const Spacing: Story = {
    parameters: {
        docs: storySource(createAvatarGroupSpacingSource()),
    },
    render: AvatarGroupSpacing,
}

export const LocalizedOverflow: Story = {
    args: { max: 2, overflowLabel: (count) => `${count} additional participants` },
    parameters: {
        docs: {
            source: {
                type: 'dynamic',
                transform: (_source: string, { args }: { args: AvatarGroupProps }) => createGroupSource(args).replace('<AvatarGroup\n', '<AvatarGroup\n    overflowLabel={(count) => `${count} additional participants`}\n'),
            },
        },
    },
}
