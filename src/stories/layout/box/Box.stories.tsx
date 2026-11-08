import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box, type BoxProps } from '@components/layout/box'
import BoxDocsPage from '@stories/layout/box/components/box-docs-page/BoxDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/box/constants'
import BoxPlaygroundPlay from '@stories/layout/box/utils/BoxPlaygroundPlay.utils'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/layout/box/sources/BoxInteractive.source.txt?raw'

const meta = {
    title: 'Layout/Box',
    component: Box,
    parameters: {
        layout: 'padded',
        docs: {
            page: BoxDocsPage,
            description: {
                component:
                    'A polymorphic container with spacing tokens and CSS layout properties. The `as` prop infers native or custom attributes and the ref target. Color props accept CSS values and consumer style takes precedence.',
            },
            source: {
                type: 'dynamic',
                transform: createPrimitiveSource<BoxProps<'div'>>(
                    interactiveSource,
                    { hasChildren: true },
                ),
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs'],
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    play: BoxPlaygroundPlay,
}
