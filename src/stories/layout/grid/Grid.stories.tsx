import type { Meta, StoryObj } from '@storybook/react-vite'

import { Grid } from '@components/layout/grid'
import GridDocsPage from '@stories/layout/grid/components/grid-docs-page/GridDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/grid/constants'
import GridPlayground from '@stories/layout/grid/components/grid-playground/GridPlayground'
import GridPlaygroundPlay from '@stories/layout/grid/utils/GridPlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/layout/grid/sources/GridInteractive.source.txt?raw'

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        layout: 'padded',
        docs: {
            page: GridDocsPage,
            description: {
                component: 'A polymorphic grid container with track, alignment and spacing presets. Other layout props remain available.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Grid>>(interactiveSource, {}) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Grid>

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
    render: GridPlayground,
    play: GridPlaygroundPlay,
}