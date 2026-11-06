import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '@components/feedback/skeleton'
import SkeletonDocsPage from '@stories/feedback/skeleton/components/skeleton-docs-page/SkeletonDocsPage'
import SkeletonVariants from '@stories/feedback/skeleton/components/skeleton-variants/SkeletonVariants'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/skeleton/constants'
import variantsSource from '@stories/feedback/skeleton/sources/SkeletonVariants.source.tsx.txt?raw'
import { createSkeletonSource } from '@stories/feedback/skeleton/utils/create-skeleton-source/createSkeletonSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A placeholder for content being loaded. Configure its shape and dimensions to match the upcoming content.',
            },
            page: SkeletonDocsPage,
            source: {
                type: 'dynamic',
                transform: createSkeletonSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: SkeletonVariants,
}
