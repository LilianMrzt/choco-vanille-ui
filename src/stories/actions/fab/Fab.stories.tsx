import type { Meta, StoryObj } from '@storybook/react-vite'

import { Fab } from '@components/actions/fab'
import FabColors from '@stories/actions/fab/components/fab-colors/FabColors'
import FabDocsPage from '@stories/actions/fab/components/fab-docs-page/FabDocsPage'
import FabExtended from '@stories/actions/fab/components/fab-extended/FabExtended'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'
import FabSizes from '@stories/actions/fab/components/fab-sizes/FabSizes'
import FabStates from '@stories/actions/fab/components/fab-states/FabStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/fab/constants'
import colorsSource from '@stories/actions/fab/sources/FabColors.source.tsx.txt?raw'
import extendedSource from '@stories/actions/fab/sources/FabExtended.source.tsx.txt?raw'
import sizesSource from '@stories/actions/fab/sources/FabSizes.source.tsx.txt?raw'
import statesSource from '@stories/actions/fab/sources/FabStates.source.tsx.txt?raw'
import { createFabSource } from '@stories/actions/fab/utils/create-fab-source/createFabSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Actions/Fab',
    component: Fab,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: FabDocsPage,
            description: {
                component: 'A floating action button for a primary action. It can display an icon alone or an icon with a visible label. Supply your own SVG component for SearchIcon in the examples.',
            },
            source: {
                type: 'dynamic',
                transform: createFabSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Fab>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    decorators: [(Story) => <FabFrame><Story /></FabFrame>],
}

export const Extended: Story = {
    parameters: { docs: { ...storySource(extendedSource) } },
    render: FabExtended,
}

export const Colors: Story = {
    parameters: { docs: { ...storySource(colorsSource) } },
    render: FabColors,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: FabSizes,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: FabStates,
}
