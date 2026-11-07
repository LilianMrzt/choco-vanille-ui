import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '@components/layout/flex'
import FlexDocsPage from '@stories/layout/flex/components/flex-docs-page/FlexDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/flex/constants'
import FlexPlayground from '@stories/layout/flex/components/flex-playground/FlexPlayground'
import FlexPlaygroundPlay from '@stories/layout/flex/utils/FlexPlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/layout/flex/sources/FlexInteractive.source.txt?raw'

const meta = {
    title: 'Layout/Flex',
    component: Flex,
    parameters: {
        layout: 'padded',
        docs: {
            page: FlexDocsPage,
            description: {
                component: 'A polymorphic flex container with spacing tokens and layout properties. Use inline to select inline-flex.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Flex>>(interactiveSource, {}) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            }
        },
    },
    render: FlexPlayground,
    play: FlexPlaygroundPlay,
}