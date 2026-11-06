import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '@components/data-display/avatar'
import AvatarColors from '@stories/data-display/avatar/components/avatar-colors/AvatarColors'
import AvatarDocsPage from '@stories/data-display/avatar/components/avatar-docs-page/AvatarDocsPage'
import AvatarPlayground from '@stories/data-display/avatar/components/avatar-playground/AvatarPlayground'
import AvatarShapes from '@stories/data-display/avatar/components/avatar-shapes/AvatarShapes'
import AvatarSizes from '@stories/data-display/avatar/components/avatar-sizes/AvatarSizes'
import AvatarStatuses from '@stories/data-display/avatar/components/avatar-statuses/AvatarStatuses'
import AvatarVariants from '@stories/data-display/avatar/components/avatar-variants/AvatarVariants'
import CompoundPlayground from '@stories/data-display/avatar/components/compound-playground/CompoundPlayground'
import { ARG_TYPES, DEFAULT_ARGS, PREVIEW_IMAGE } from '@stories/data-display/avatar/constants'
import avatarShapesSource from '@stories/data-display/avatar/sources/AvatarShapes.source.tsx.txt?raw'
import avatarVariantsSource from '@stories/data-display/avatar/sources/AvatarVariants.source.tsx.txt?raw'
import { type AvatarStoryArgs } from '@stories/data-display/avatar/types'
import { createAvatarColorsSource } from '@stories/data-display/avatar/utils/create-avatar-colors-source/createAvatarColorsSource.utils'
import { createAvatarCompoundSource } from '@stories/data-display/avatar/utils/create-avatar-compound-source/createAvatarCompoundSource.utils'
import { createAvatarSizesSource } from '@stories/data-display/avatar/utils/create-avatar-sizes-source/createAvatarSizesSource.utils'
import { createAvatarSource } from '@stories/data-display/avatar/utils/create-avatar-source/createAvatarSource.utils'
import { createAvatarStatusesSource } from '@stories/data-display/avatar/utils/create-avatar-statuses-source/createAvatarStatusesSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Data Display/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    render: (args) => <AvatarPlayground {...args} />,
    parameters: {
        layout: 'centered',
        docs: {
            page: AvatarDocsPage,
            description: { component: 'Displays a profile image, initials or a decorative icon, with optional presence. Compose `Avatar.Root`, `.Image`, `.Fallback` and `.Status` when individual slots need custom content.' },
            source: {
                type: 'dynamic',
                transform: (_source: string, context: { args: AvatarStoryArgs }) => createAvatarSource(context.args),
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<AvatarStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
    parameters: { docs: storySource(createAvatarSizesSource()) },
    render: AvatarSizes,
}

export const Shapes: Story = {
    parameters: { docs: storySource(avatarShapesSource) },
    render: AvatarShapes,
}

export const Colors: Story = {
    parameters: { docs: storySource(createAvatarColorsSource()) },
    render: AvatarColors,
}

export const Variants: Story = {
    parameters: { docs: storySource(avatarVariantsSource) },
    render: AvatarVariants,
}

export const Statuses: Story = {
    parameters: { docs: storySource(createAvatarStatusesSource()) },
    render: AvatarStatuses,
}

export const DefaultIcon: Story = {
    args: { initials: '', 'aria-label': 'Unnamed profile' },
}

export const WithImage: Story = {
    args: { src: PREVIEW_IMAGE, alt: 'Preview illustration', initials: 'PI', 'aria-label': 'Preview illustration' },
}

export const IndependentStatusSize: Story = {
    args: { size: 'xl', status: 'online', statusSize: 'sm', statusLabel: 'Available' },
}

export const Compound: Story = {
    args: {
        compoundLabel: 'Jane Doe',
        compoundFallback: 'JD',
        compoundImage: '',
        compoundAlt: 'Jane Doe',
        compoundStatus: 'online',
    },
    parameters: {
        docs: {
            description: { story: 'Composition controls are demonstration args assigned to their named slots. Appearance controls style the root; fallbackDelay and statusSize style their respective slots.' },
            source: {
                type: 'dynamic',
                transform: createAvatarCompoundSource,
            },
        },
    },
    render: (args) => <CompoundPlayground {...args} />,
}
