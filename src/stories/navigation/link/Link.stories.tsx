import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from '@components/navigation/link'
import LinkAppearance from './components/link-appearance/LinkAppearance'
import LinkFontSizes from './components/link-font-sizes/LinkFontSizes'
import LinkDocsPage from '@stories/navigation/link/components/link-docs-page/LinkDocsPage'
import LinkIcons from '@stories/navigation/link/components/link-icons/LinkIcons'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/link/constants'
import appearanceSource from './sources/LinkAppearance.source.txt?raw'
import fontSizesSource from './sources/LinkFontSizes.source.txt?raw'
import iconsSource from '@stories/navigation/link/sources/LinkIcons.source.txt?raw'
import { createLinkSource } from '@stories/navigation/link/utils/create-link-source/createLinkSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Link',
    component: Link,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
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
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource), description: { story: 'Compare theme colors and font weights at the default font size.' } } },
    render: LinkAppearance,
}
export const FontSizes: Story = {
    parameters: { docs: { ...storySource(fontSizesSource), description: { story: 'Compare every supported font size separately from colors and font weights.' } } },
    render: LinkFontSizes,
}
export const WithIcons: Story = { parameters: { docs: { ...storySource(iconsSource) } }, render: LinkIcons }
