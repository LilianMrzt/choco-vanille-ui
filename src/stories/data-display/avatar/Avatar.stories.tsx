import AvatarSizes from '@stories/data-display/avatar/components/avatar-sizes/AvatarSizes'
import sizesSource from '@stories/data-display/avatar/sources/AvatarSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '@components/data-display/avatar'
import AvatarDocsPage from '@stories/data-display/avatar/components/avatar-docs-page/AvatarDocsPage'
import AvatarOnMutedSurface from '@stories/data-display/avatar/components/avatar-on-muted-surface/AvatarOnMutedSurface'
import AvatarApiPlayground from '@stories/data-display/avatar/components/avatar-api-playground/AvatarApiPlayground'
import { createAvatarPlaygroundSource } from '@stories/data-display/avatar/utils/create-avatar-playground-source/createAvatarPlaygroundSource.utils'
import AvatarStatuses from '@stories/data-display/avatar/components/avatar-statuses/AvatarStatuses'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/avatar/constants'
import { type AvatarStoryArgs } from '@stories/data-display/avatar/types'
import { createAvatarMutedSurfaceSource } from '@stories/data-display/avatar/utils/create-avatar-muted-surface-source.utils'
import { createAvatarStatusesSource } from '@stories/data-display/avatar/utils/create-avatar-statuses-source/createAvatarStatusesSource.utils'
import AvatarGroupSpacing from '@stories/data-display/avatar-group/components/avatar-group-spacing/AvatarGroupSpacing'
import { createAvatarGroupSpacingSource } from '@stories/data-display/avatar-group/utils/create-avatar-group-spacing-source/createAvatarGroupSpacingSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import AvatarAppearance from '@stories/data-display/avatar/components/avatar-appearance/AvatarAppearance'
import appearanceSource from '@stories/data-display/avatar/sources/AvatarAppearance.source.txt?raw'
import AvatarContent from '@stories/data-display/avatar/components/avatar-content/AvatarContent'
import contentSource from '@stories/data-display/avatar/sources/AvatarContent.source.txt?raw'

const meta = {
    title: 'Data Display/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    render: AvatarApiPlayground,
    parameters: {
        layout: 'centered',
        docs: {
            page: AvatarDocsPage,
            description: { component: 'Displays a profile image, initials or a decorative icon, with optional presence. Use `AvatarGroup.Item` to compose a group; `Avatar` is the same component and also exposes individual slots for custom content.' },
            source: {
                type: 'dynamic',
                transform: createAvatarPlaygroundSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<AvatarStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Statuses: Story = {
    parameters: { docs: storySource(createAvatarStatusesSource()) },
    render: AvatarStatuses,
}
export const OnMutedSurface: Story = {
    parameters: { docs: storySource(createAvatarMutedSurfaceSource()) },
    render: AvatarOnMutedSurface,
}
export const GroupSpacing: Story = {
    parameters: { docs: storySource(createAvatarGroupSpacingSource()) },
    render: AvatarGroupSpacing,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: AvatarAppearance,
}
export const Content: Story = { render: AvatarContent, parameters: { docs: { ...storySource(contentSource) } } }

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: AvatarSizes,
}
