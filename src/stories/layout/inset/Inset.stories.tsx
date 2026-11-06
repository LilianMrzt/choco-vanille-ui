import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Inset,
} from '@components/layout/inset'
import InsetDocsPage from '@stories/layout/inset/components/inset-docs-page/InsetDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/layout/inset/constants'
import InsetPlayground from '@stories/layout/inset/components/inset-playground/InsetPlayground'
import InsetPlaygroundPlay from '@stories/layout/inset/utils/InsetPlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/layout/inset/sources/InsetInteractive.source.tsx.txt?raw'

const meta = {
    title: 'Layout/Inset',
    component: Inset,
    parameters: {
        layout: 'padded',
        docs: {
            page: InsetDocsPage,
            description: {
                component: 'Extends content into the padding of its parent using a matching spacing token. Choose the affected side and clipping behavior.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Inset>>(interactiveSource, {}) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Inset>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the Controls panel to change the bleed size and direction.',
            }
        },
    },
    render: InsetPlayground,
    play: InsetPlaygroundPlay,
}
