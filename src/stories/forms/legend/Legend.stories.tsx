import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

import { Legend } from '@components/forms/legend'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import LegendDocsPage from '@stories/forms/legend/components/legend-docs-page/LegendDocsPage'
import LegendPlayground from '@stories/forms/legend/components/legend-playground/LegendPlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/forms/legend/constants'
import playgroundSource from '@stories/forms/legend/sources/LegendPlayground.source.tsx.txt?raw'

const meta = {
    title: 'Forms/Legend',
    component: Legend,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: LegendDocsPage,
            description: {
                component: 'Names a fieldset using a native legend. Typography props customize its presentation without changing its semantics.',
            },
            source: {
                type: 'dynamic',
                transform: createPrimitiveSource<ComponentProps<typeof Legend>>(playgroundSource, { hasChildren: true }),
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    render: LegendPlayground,
} satisfies Meta<typeof Legend>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
    args: { variant: 'h3' },
    parameters: { docs: { description: { story: 'Use a typography variant without changing the native legend element.' } } },
}

export const FontSizes: Story = {
    args: { fontSize: 24 },
    parameters: { docs: { description: { story: 'Adjust the legend font size independently of its semantics.' } } },
}

export const FontWeights: Story = {
    args: { fontWeight: 'bold' },
    parameters: { docs: { description: { story: 'Adjust the legend font weight using typography tokens.' } } },
}

export const Colors: Story = {
    args: { color: 'var(--color-primary-main)' },
    parameters: { docs: { description: { story: 'Set a CSS color or theme variable and preserve sufficient contrast.' } } },
}
