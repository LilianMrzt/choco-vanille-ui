import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from '@components/feedback/spinner'
import SpinnerColors from '@stories/feedback/spinner/components/spinner-colors/SpinnerColors'
import SpinnerDocsPage from '@stories/feedback/spinner/components/spinner-docs-page/SpinnerDocsPage'
import SpinnerSizes from '@stories/feedback/spinner/components/spinner-sizes/SpinnerSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/spinner/constants'
import colorsSource from '@stories/feedback/spinner/sources/SpinnerColors.source.tsx.txt?raw'
import sizesSource from '@stories/feedback/spinner/sources/SpinnerSizes.source.tsx.txt?raw'
import { createSpinnerSource } from '@stories/feedback/spinner/utils/create-spinner-source/createSpinnerSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A compact loading indicator for short-lived actions. Use Skeleton when the structure of upcoming content is loading.',
            },
            page: SpinnerDocsPage,
            source: {
                type: 'dynamic',
                transform: createSpinnerSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Colors: Story = {
    parameters: { docs: { ...storySource(colorsSource) } },
    render: SpinnerColors,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: SpinnerSizes,
}
