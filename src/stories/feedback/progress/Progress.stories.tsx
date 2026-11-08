import ProgressSizes from '@stories/feedback/progress/components/progress-sizes/ProgressSizes'
import sizesSource from '@stories/feedback/progress/sources/ProgressSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '@components/feedback/progress'
import ProgressDocsPage from '@stories/feedback/progress/components/progress-docs-page/ProgressDocsPage'
import ProgressExamples from '@stories/feedback/progress/components/progress-examples/ProgressExamples'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/progress/constants'
import examplesSource from '@stories/feedback/progress/sources/ProgressExamples.source.txt?raw'
import { createProgressSource } from '@stories/feedback/progress/utils/create-progress-source/createProgressSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import ProgressAppearance from '@stories/feedback/progress/components/progress-appearance/ProgressAppearance'
import appearanceSource from '@stories/feedback/progress/sources/ProgressAppearance.source.txt?raw'
import ProgressPlayground from '@stories/feedback/progress/components/progress-playground/ProgressPlayground'

const meta: Meta<typeof Progress> = {
    title: 'Feedback/Progress',
    component: Progress,
    render: ProgressPlayground,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Linear and circular progress indicators with accessible names and percentage values.',
            },
            page: ProgressDocsPage,
            source: { type: 'dynamic', transform: createProgressSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
}

export default meta

type Story = StoryObj<typeof Progress>

export const Playground: Story = { args: DEFAULT_ARGS }
export const Examples: Story = {
    args: DEFAULT_ARGS,
    parameters: { docs: { ...storySource(examplesSource) } },
    render: ProgressExamples,
}
export const Appearance: Story = {
    args: DEFAULT_ARGS,
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: ProgressAppearance,
}

export const Sizes: Story = {
    args: DEFAULT_ARGS,
    parameters: { docs: { ...storySource(sizesSource) } },
    render: ProgressSizes,
}
