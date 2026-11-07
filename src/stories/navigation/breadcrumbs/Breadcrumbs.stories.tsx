import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'
import BreadcrumbsAppearance from './components/breadcrumbs-appearance/BreadcrumbsAppearance'
import BreadcrumbsDocsPage from '@stories/navigation/breadcrumbs/components/breadcrumbs-docs-page/BreadcrumbsDocsPage'
import BreadcrumbsExamples from '@stories/navigation/breadcrumbs/components/breadcrumbs-examples/BreadcrumbsExamples'
import BreadcrumbsPlayground from './components/breadcrumbs-playground/BreadcrumbsPlayground'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/breadcrumbs/constants'
import type { BreadcrumbsStoryArgs } from './types'
import appearanceSource from './sources/BreadcrumbsAppearance.source.txt?raw'
import examplesSource from '@stories/navigation/breadcrumbs/sources/BreadcrumbsExamples.source.txt?raw'
import { createBreadcrumbsSource } from '@stories/navigation/breadcrumbs/utils/create-breadcrumbs-source/createBreadcrumbsSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
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
    render: BreadcrumbsPlayground,
}

export const Examples: Story = {
    parameters: { docs: { ...storySource(examplesSource) } },
    render: BreadcrumbsExamples,
}

export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: BreadcrumbsAppearance,
}
