import type { Meta, StoryObj } from '@storybook/react-vite'

import { Callout } from '@components/feedback/callout'
import CalloutDocsPage from '@stories/feedback/callout/components/callout-docs-page/CalloutDocsPage'
import CalloutVariants from '@stories/feedback/callout/components/callout-variants/CalloutVariants'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/callout/constants'
import variantsSource from '@stories/feedback/callout/sources/CalloutVariants.source.txt?raw'
import { createCalloutSource } from '@stories/feedback/callout/utils/create-callout-source/createCalloutSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import type { CalloutStoryArgs } from '@stories/feedback/callout/types'
import CalloutPlayground from '@stories/feedback/callout/components/callout-playground/CalloutPlayground'

const meta = {
    title: 'Feedback/Callout',
    component: Callout,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A contextual message with a default icon, convenience props and compound slots. Supply your own icon components when using custom icons or actions.',
            },
            page: CalloutDocsPage,
            source: { type: 'dynamic', transform: createCalloutSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<CalloutStoryArgs>

export default meta

type Story = StoryObj<CalloutStoryArgs>

export const Playground: Story = {
    render: CalloutPlayground,
}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: CalloutVariants,
}
