import FabSizes from '@stories/actions/fab/components/fab-sizes/FabSizes'
import sizesSource from '@stories/actions/fab/sources/FabSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Fab } from '@components/actions/fab'
import FabDocsPage from '@stories/actions/fab/components/fab-docs-page/FabDocsPage'
import FabExtended from '@stories/actions/fab/components/fab-extended/FabExtended'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'
import FabStates from '@stories/actions/fab/components/fab-states/FabStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/fab/constants'
import extendedSource from '@stories/actions/fab/sources/FabExtended.source.txt?raw'
import statesSource from '@stories/actions/fab/sources/FabStates.source.txt?raw'
import { createFabSource } from '@stories/actions/fab/utils/create-fab-source/createFabSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import FabAppearance from '@stories/actions/fab/components/fab-appearance/FabAppearance'
import appearanceSource from '@stories/actions/fab/sources/FabAppearance.source.txt?raw'

const meta = {
    title: 'Actions/Fab',
    component: Fab,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: FabDocsPage,
            description: {
                component: 'A floating action button for a primary action. It can display an icon alone or an icon with a visible label. Supply your own local Iconify data for SearchIcon in the examples.',
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
export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: FabStates,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: FabAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: FabSizes,
}
