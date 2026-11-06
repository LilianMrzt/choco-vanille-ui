import type { Meta, StoryObj } from '@storybook/react-vite'

import { Image } from '@components/layout/image'
import ImageDocsPage from '@stories/layout/image/components/image-docs-page/ImageDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/image/constants'
import ImagePlaygroundPlay from '@stories/layout/image/utils/ImagePlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/layout/image/sources/ImageInteractive.source.tsx.txt?raw'

const meta = {
    title: 'Layout/Image',
    component: Image,
    parameters: {
        layout: 'padded',
        docs: {
            page: ImageDocsPage,
            description: {
                component: 'A native image with size, fit, spacing and radius props. Supply meaningful alternative text or an empty alt for decoration.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Image>>(interactiveSource, {}) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Image>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            }
        },
    },
    play: ImagePlaygroundPlay,
}
