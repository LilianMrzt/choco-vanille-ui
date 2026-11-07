import SpinnerSizes from '@stories/feedback/spinner/components/spinner-sizes/SpinnerSizes'
import sizesSource from '@stories/feedback/spinner/sources/SpinnerSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from '@components/feedback/spinner'
import SpinnerDocsPage from '@stories/feedback/spinner/components/spinner-docs-page/SpinnerDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/spinner/constants'
import { createSpinnerSource } from '@stories/feedback/spinner/utils/create-spinner-source/createSpinnerSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import SpinnerAppearance from '@stories/feedback/spinner/components/spinner-appearance/SpinnerAppearance'
import appearanceSource from '@stories/feedback/spinner/sources/SpinnerAppearance.source.txt?raw'

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
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: SpinnerAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: SpinnerSizes,
}
