import IconButtonSizes from '@stories/actions/icon-button/components/icon-button-sizes/IconButtonSizes'
import sizesSource from '@stories/actions/icon-button/sources/IconButtonSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconButton } from '@/components/actions/icon-button'
import { storySource } from '@stories/_shared/utils/storySource'
import statesSource from '@stories/actions/icon-button/sources/IconButtonStates.source.txt?raw'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/icon-button/constants'
import IconButtonDocsPage from '@stories/actions/icon-button/components/icon-button-docs-page/IconButtonDocsPage'
import { playIconButtonPlayground } from '@stories/actions/icon-button/utils/playIconButtonPlayground.utils'
import IconButtonStates from '@stories/actions/icon-button/components/icon-button-states/IconButtonStates'
import { createIconButtonSource } from '@stories/actions/icon-button/utils/create-icon-button-source/createIconButtonSource.utils'
import IconButtonAppearance from '@stories/actions/icon-button/components/icon-button-appearance/IconButtonAppearance'
import appearanceSource from '@stories/actions/icon-button/sources/IconButtonAppearance.source.txt?raw'

const meta = {
    title: 'Actions/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
        docs: {
            page: IconButtonDocsPage,
            source: { type: 'dynamic', transform: createIconButtonSource },
            description: {
                component: 'An icon-only action button for toolbars and compact controls. Supply your own local Iconify data and an accessible name describing the action.',
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    play: playIconButtonPlayground,
}
export const States: Story = {
    parameters: {
        docs: {
            ...storySource(statesSource),
        },
    },
    render: IconButtonStates,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: IconButtonAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: IconButtonSizes,
}
