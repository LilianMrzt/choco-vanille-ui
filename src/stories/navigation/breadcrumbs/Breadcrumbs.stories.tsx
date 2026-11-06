import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'
import BreadcrumbsColors from '@stories/navigation/breadcrumbs/components/breadcrumbs-colors/BreadcrumbsColors'
import BreadcrumbsDocsPage from '@stories/navigation/breadcrumbs/components/breadcrumbs-docs-page/BreadcrumbsDocsPage'
import BreadcrumbsExamples from '@stories/navigation/breadcrumbs/components/breadcrumbs-examples/BreadcrumbsExamples'
import { ARG_TYPES, DEFAULT_ARGS, type BreadcrumbsStoryArgs } from '@stories/navigation/breadcrumbs/constants'
import colorsSource from '@stories/navigation/breadcrumbs/sources/BreadcrumbsColors.source.tsx.txt?raw'
import examplesSource from '@stories/navigation/breadcrumbs/sources/BreadcrumbsExamples.source.tsx.txt?raw'
import { createBreadcrumbsSource } from '@stories/navigation/breadcrumbs/utils/create-breadcrumbs-source/createBreadcrumbsSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A navigation landmark showing the current page within a hierarchy. Compose it with Breadcrumbs.Item.',
            },
            page: BreadcrumbsDocsPage,
            source: { type: 'dynamic', transform: createBreadcrumbsSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<BreadcrumbsStoryArgs>

export default meta

type Story = StoryObj<BreadcrumbsStoryArgs>

export const Playground: Story = {
    render: ({ children: _children, currentLabel, ...args }) => (
        <Breadcrumbs {...args}>
            <Breadcrumbs.Item
                label={'Home'}
                href={'/'}
            />
            <Breadcrumbs.Item
                label={'Products'}
                href={'/products'}
            />
            <Breadcrumbs.Item label={currentLabel} />
        </Breadcrumbs>
    ),
}

export const Examples: Story = {
    parameters: { docs: { ...storySource(examplesSource) } },
    render: BreadcrumbsExamples,
}

export const Colors: Story = {
    parameters: { docs: { ...storySource(colorsSource) } },
    render: BreadcrumbsColors,
}
