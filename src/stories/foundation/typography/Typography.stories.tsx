import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '@/components/foundation/typography'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { storySource } from '@stories/_shared/utils/storySource'
import TypographyDocsPage from '@stories/foundation/typography/components/typography-docs-page/TypographyDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/foundation/typography/constants'
import TypographyPlaygroundPlay from '@stories/foundation/typography/utils/TypographyPlaygroundPlay.utils'
import TypographyVariants from '@stories/foundation/typography/components/typography-variants/TypographyVariants'
import TypographyFontSizes from '@stories/foundation/typography/components/typography-font-sizes/TypographyFontSizes'
import TypographyFontWeights from '@stories/foundation/typography/components/typography-font-weights/TypographyFontWeights'
import TypographyVariantsSource from '@stories/foundation/typography/sources/TypographyVariants.source.tsx.txt?raw'
import TypographyFontSizesSource from '@stories/foundation/typography/sources/TypographyFontSizes.source.tsx.txt?raw'
import TypographyFontWeightsSource from '@stories/foundation/typography/sources/TypographyFontWeights.source.tsx.txt?raw'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/foundation/typography/sources/TypographyInteractive.source.tsx.txt?raw'

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

export const Colors: Story = {
    args: {
        color: vars.color.primary.main,
    },
    parameters: {
        docs: {
            description: {
                story: 'Use a theme variable or try var(--custom-color, rebeccapurple), currentColor, or a CSS color in Controls.',
            }
        },
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ TypographyVariantsSource),
        },
    },
    render: TypographyVariants,
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ TypographyFontSizesSource),
        },
    },
    render: TypographyFontSizes,
}

export const FontWeights: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ TypographyFontWeightsSource),
        },
    },
    render: TypographyFontWeights,
}
