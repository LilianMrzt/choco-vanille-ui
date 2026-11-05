import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '@components/data-display/badge'
import BadgeColors from '@stories/data-display/badge/components/badge-colors/BadgeColors'
import BadgeDocsPage from '@stories/data-display/badge/components/badge-docs-page/BadgeDocsPage'
import BadgeSizes from '@stories/data-display/badge/components/badge-sizes/BadgeSizes'
import BadgeVariants from '@stories/data-display/badge/components/badge-variants/BadgeVariants'
import BadgeWithIcons from '@stories/data-display/badge/components/badge-with-icons/BadgeWithIcons'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/badge/constants'
import badgeSizesSource from '@stories/data-display/badge/sources/BadgeSizes.source.tsx.txt?raw'
import badgeWithIconsSource from '@stories/data-display/badge/sources/BadgeWithIcons.source.tsx.txt?raw'
import { createBadgeColorsSource } from '@stories/data-display/badge/utils/create-badge-colors-source/createBadgeColorsSource.utils'
import { createBadgeSource } from '@stories/data-display/badge/utils/create-badge-source/createBadgeSource.utils'
import { createBadgeVariantsSource } from '@stories/data-display/badge/utils/create-badge-variants-source/createBadgeVariantsSource.utils'
import { playBadgePlayground } from '@stories/data-display/badge/utils/playBadgePlayground.utils'
import { storySource } from '@stories/utils/storySource'

const meta = {
    title: 'Data Display/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: BadgeDocsPage,
            description: {
                component: 'A noninteractive label with four treatments, thirteen semantic color intents and three sizes. Optional icons and inherited layout props customize its presentation.',
            },
            source: {
                type: 'dynamic',
                transform: createBadgeSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    play: playBadgePlayground,
}

export const Variants: Story = {
    parameters: {
        docs: {
            ...storySource(createBadgeVariantsSource()),
        },
    },
    render: BadgeVariants,
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(badgeSizesSource),
        },
    },
    render: BadgeSizes,
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(createBadgeColorsSource()),
        },
    },
    render: BadgeColors,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: { story: 'Supply your own SVG components for CheckIcon and ChevronRightIcon. Both icons remain decorative.' },
            ...storySource(badgeWithIconsSource),
        },
    },
    render: BadgeWithIcons,
}

export const LongLabel: Story = {
    args: { label: 'A longer label remains fully visible', maxWidth: '100%' },
    parameters: {
        docs: {
            description: { story: 'Labels are not truncated. Allow enough space or provide a concise label in narrow layouts.' },
        },
    },
}
