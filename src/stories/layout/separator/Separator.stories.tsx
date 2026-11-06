import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '@components/layout/separator'
import { storySource } from '@stories/_shared/utils/storySource'
import SeparatorDocsPage from '@stories/layout/separator/components/separator-docs-page/SeparatorDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/separator/constants'
import SeparatorPlayground from '@stories/layout/separator/components/separator-playground/SeparatorPlayground'
import SeparatorPlaygroundPlay from '@stories/layout/separator/utils/SeparatorPlaygroundPlay.utils'
import SeparatorWithLabel from '@stories/layout/separator/components/separator-with-label/SeparatorWithLabel'
import SeparatorColors from '@stories/layout/separator/components/separator-colors/SeparatorColors'
import SeparatorOrientations from '@stories/layout/separator/components/separator-orientations/SeparatorOrientations'
import SeparatorWithLabelSource from '@stories/layout/separator/sources/SeparatorWithLabel.source.tsx.txt?raw'
import SeparatorColorsSource from '@stories/layout/separator/sources/SeparatorColors.source.tsx.txt?raw'
import SeparatorOrientationsSource from '@stories/layout/separator/sources/SeparatorOrientations.source.tsx.txt?raw'
import { createSeparatorSource } from '@stories/layout/separator/utils/createSeparatorSource.utils'

const meta = {
    title: 'Layout/Separator',
    component: Separator,
    parameters: {
        layout: 'padded',
        docs: {
            page: SeparatorDocsPage,
            description: {
                component: 'Separates content with a horizontal or vertical rule and an optional label. Its orientation is exposed to assistive technology.',
            },
            source: { type: 'dynamic', transform: createSeparatorSource }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to switch between horizontal and vertical orientations.',
            }
        },
    },
    render: SeparatorPlayground,
    play: SeparatorPlaygroundPlay,
}

export const WithLabel: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ SeparatorWithLabelSource),
        },
    },
    render: SeparatorWithLabel,
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ SeparatorColorsSource),
        },
    },
    render: SeparatorColors,
}

export const Orientations: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ SeparatorOrientationsSource),
        },
    },
    render: SeparatorOrientations,
}
