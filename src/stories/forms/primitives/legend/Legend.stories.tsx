import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'

import { Legend } from '@components/forms/primitives/legend'
import LegendDocsPage from '@stories/forms/primitives/legend/components/legend-docs-page/LegendDocsPage'
import LegendPlayground from '@stories/forms/primitives/legend/components/legend-playground/LegendPlayground'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/primitives/legend/constants'
import { createLegendSource } from '@stories/forms/primitives/legend/utils/createLegendSource.utils'
import appearanceSource from '@stories/forms/primitives/legend/sources/LegendAppearance.source.txt?raw'
import LegendAppearance from '@stories/forms/primitives/legend/components/legend-appearance/LegendAppearance'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Forms/Primitives/Legend',
    component: Legend,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: LegendDocsPage,
            description: {
                component: DESCRIPTION,
            },
            source: {
                type: 'dynamic',
                transform: createLegendSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
    render: LegendPlayground,
} satisfies Meta<typeof Legend>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource), description: { story: 'Each section changes one typography axis while retaining the native legend element.' } } },
    render: LegendAppearance,
}
