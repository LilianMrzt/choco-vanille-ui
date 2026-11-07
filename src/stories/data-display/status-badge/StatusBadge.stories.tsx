import StatusBadgeSizes from '@stories/data-display/status-badge/components/status-badge-sizes/StatusBadgeSizes'
import sizesSource from '@stories/data-display/status-badge/sources/StatusBadgeSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    StatusBadge
} from '@components/data-display/status-badge'
import StatusBadgeDocsPage from '@stories/data-display/status-badge/components/status-badge-docs-page/StatusBadgeDocsPage'
import StatusBadgeNumbers from '@stories/data-display/status-badge/components/status-badge-numbers/StatusBadgeNumbers'
import StatusBadgePlayground from '@stories/data-display/status-badge/components/status-badge-playground/StatusBadgePlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/status-badge/constants'
import statusBadgeNumbersSource from '@stories/data-display/status-badge/sources/StatusBadgeNumbers.source.txt?raw'
import { createStatusBadgeSource } from '@stories/data-display/status-badge/utils/create-status-badge-source/createStatusBadgeSource.utils'
import { playStatusBadgePlayground } from '@stories/data-display/status-badge/utils/playStatusBadgePlayground.utils'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import StatusBadgeAppearance from '@stories/data-display/status-badge/components/status-badge-appearance/StatusBadgeAppearance'
import appearanceSource from '@stories/data-display/status-badge/sources/StatusBadgeAppearance.source.txt?raw'

const meta = {
    title: 'Data Display/StatusBadge',
    component: StatusBadge,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: StatusBadgeDocsPage,
            description: {
                component: md /* language=markdown */ `
A wrapper that places a small colored circle on one corner of a component.
The indicator uses the same thirteen color intents as \`Badge\`.
        `,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof StatusBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to change the indicator color, corner, number, and accessible label.',
            },
            source: {
                type: 'dynamic',
                transform: createStatusBadgeSource,
            },
        },
    },
    render: StatusBadgePlayground,
    play: playStatusBadgePlayground,
} satisfies Story
export const Numbers: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Zero and multi-digit values remain visible. Numbered indicators grow horizontally instead of truncating the value.',
            },
            ...storySource(statusBadgeNumbersSource),
        },
    },
    render: StatusBadgeNumbers,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: StatusBadgeAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: StatusBadgeSizes,
}
