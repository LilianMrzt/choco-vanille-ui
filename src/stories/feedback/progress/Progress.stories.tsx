import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '@components/feedback/progress'
import ProgressColors from '@stories/feedback/progress/components/progress-colors/ProgressColors'
import ProgressDocsPage from '@stories/feedback/progress/components/progress-docs-page/ProgressDocsPage'
import ProgressExamples from '@stories/feedback/progress/components/progress-examples/ProgressExamples'
import ProgressSizes from '@stories/feedback/progress/components/progress-sizes/ProgressSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/progress/constants'
import colorsSource from '@stories/feedback/progress/sources/ProgressColors.source.tsx.txt?raw'
import examplesSource from '@stories/feedback/progress/sources/ProgressExamples.source.tsx.txt?raw'
import sizesSource from '@stories/feedback/progress/sources/ProgressSizes.source.tsx.txt?raw'
import { createProgressSource } from '@stories/feedback/progress/utils/create-progress-source/createProgressSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/Progress',
    component: Progress,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: { component: 'Linear and circular progress indicators with accessible names and percentage values.' },
            page: ProgressDocsPage,
            source: { type: 'dynamic', transform: createProgressSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { args: DEFAULT_ARGS }
export const Sizes: Story = { args: DEFAULT_ARGS, parameters: { docs: { ...storySource(sizesSource) } }, render: ProgressSizes }
export const Colors: Story = { args: DEFAULT_ARGS, parameters: { docs: { ...storySource(colorsSource) } }, render: ProgressColors }
export const Examples: Story = { args: DEFAULT_ARGS, parameters: { docs: { ...storySource(examplesSource) } }, render: ProgressExamples }
