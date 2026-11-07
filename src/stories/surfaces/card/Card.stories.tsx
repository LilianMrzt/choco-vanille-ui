import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '@components/surfaces/card'
import CardColors from '@stories/surfaces/card/components/card-colors/CardColors'
import CardDocsPage from '@stories/surfaces/card/components/card-docs-page/CardDocsPage'
import CardPlayground from '@stories/surfaces/card/components/card-playground/CardPlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/surfaces/card/constants'
import colorsSource from '@stories/surfaces/card/sources/CardColors.source.txt?raw'
import type { CardStoryArgs } from '@stories/surfaces/card/types'
import { createCardSource } from '@stories/surfaces/card/utils/create-card-source/createCardSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Surfaces/Card',
    component: Card,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    render: (args) => <CardPlayground {...args} />,
    parameters: {
        layout: 'centered',
        docs: {
            page: CardDocsPage,
            description: {
                component: 'A surface container for related content. Compose its header, body and footer to structure the content and actions. Supply your own SVG component for SearchIcon in the example.',
            },
            source: {
                type: 'dynamic',
                transform: createCardSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<CardStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Colors: Story = {
    parameters: { docs: { ...storySource(colorsSource) } },
    render: CardColors,
}
