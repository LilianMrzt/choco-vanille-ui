import TypographyFontSizes from '@stories/foundation/typography/components/typography-font-sizes/TypographyFontSizes'
import sizesSource from '@stories/foundation/typography/sources/TypographyFontSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '@/components/foundation/typography'

import { storySource } from '@stories/_shared/utils/storySource'
import TypographyDocsPage from '@stories/foundation/typography/components/typography-docs-page/TypographyDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/foundation/typography/constants'
import TypographyPlaygroundPlay from '@stories/foundation/typography/utils/TypographyPlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/foundation/typography/sources/TypographyInteractive.source.txt?raw'
import TypographyAppearance from '@stories/foundation/typography/components/typography-appearance/TypographyAppearance'
import appearanceSource from '@stories/foundation/typography/sources/TypographyAppearance.source.txt?raw'

const meta = {
    title: 'Foundation/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Renders semantic text with typographic presets and optional CSS overrides. The element follows the variant unless overridden with as.',
            },
            page: TypographyDocsPage,
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Typography>>(interactiveSource, { hasChildren: true }) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    tags: ['autodocs']
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to adjust `variant`, `fontSize`, `fontWeight`, `color`, and `ellipsis` in real time.',
            }
        },
    },
    play: TypographyPlaygroundPlay,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: TypographyAppearance,
}

export const FontSizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: TypographyFontSizes,
}
