import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from '@components/navigation/link'
import LinkColors from '@stories/navigation/link/components/link-colors/LinkColors'
import LinkDocsPage from '@stories/navigation/link/components/link-docs-page/LinkDocsPage'
import LinkFontSizes from '@stories/navigation/link/components/link-font-sizes/LinkFontSizes'
import LinkFontWeights from '@stories/navigation/link/components/link-font-weights/LinkFontWeights'
import LinkIcons from '@stories/navigation/link/components/link-icons/LinkIcons'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/link/constants'
import colorsSource from '@stories/navigation/link/sources/LinkColors.source.tsx.txt?raw'
import sizesSource from '@stories/navigation/link/sources/LinkFontSizes.source.tsx.txt?raw'
import weightsSource from '@stories/navigation/link/sources/LinkFontWeights.source.tsx.txt?raw'
import iconsSource from '@stories/navigation/link/sources/LinkIcons.source.tsx.txt?raw'
import { createLinkSource } from '@stories/navigation/link/utils/create-link-source/createLinkSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A native link with typography and optional decorative icons. Supplying an onClick handler prevents native navigation; supply your own SVG components for the icon examples.',
            },
            page: LinkDocsPage,
            source: {
                type: 'dynamic',
                transform: createLinkSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const FontSizes: Story = { parameters: { docs: { ...storySource(sizesSource) } }, render: LinkFontSizes }
export const Colors: Story = { parameters: { docs: { ...storySource(colorsSource) } }, render: LinkColors }
export const FontWeights: Story = { parameters: { docs: { ...storySource(weightsSource) } }, render: LinkFontWeights }
export const WithIcons: Story = { parameters: { docs: { ...storySource(iconsSource) } }, render: LinkIcons }
