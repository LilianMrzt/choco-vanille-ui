import type { Meta, StoryObj } from '@storybook/react-vite'

import { SvgImage } from '@components/data-display/svg-image'
import { storySource } from '@stories/_shared/utils/storySource'
import SvgImageDocsPage from '@stories/data-display/svg-image/components/svg-image-docs-page/SvgImageDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/svg-image/constants'
import SvgImagePlaygroundPlay from '@stories/data-display/svg-image/utils/SvgImagePlaygroundPlay.utils'
import SvgImageColors from '@stories/data-display/svg-image/components/svg-image-colors/SvgImageColors'
import SvgImageObjectFits from '@stories/data-display/svg-image/components/svg-image-object-fits/SvgImageObjectFits'
import SvgImageColorsSource from '@stories/data-display/svg-image/sources/SvgImageColors.source.tsx.txt?raw'
import SvgImageObjectFitsSource from '@stories/data-display/svg-image/sources/SvgImageObjectFits.source.tsx.txt?raw'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/data-display/svg-image/sources/SvgImageInteractive.source.tsx.txt?raw'

const meta = {
    title: 'Data Display/SvgImage',
    component: SvgImage,
    parameters: {
        layout: 'padded',
        docs: {
            page: SvgImageDocsPage,
            description: {
                component: 'Displays a locally bundled SVG with image layout props and theme color tokens. Supply an accessible name for informative images.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof SvgImage>>(interactiveSource, { omit: ['image'] }) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof SvgImage>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to change the SVG image dimensions, object positioning, spacing, background, and accessible name.',
            }
        },
    },
    play: SvgImagePlaygroundPlay,
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ SvgImageColorsSource),
        },
    },
    render: SvgImageColors,
}

export const ObjectFits: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ SvgImageObjectFitsSource),
        },
    },
    render: SvgImageObjectFits,
}
