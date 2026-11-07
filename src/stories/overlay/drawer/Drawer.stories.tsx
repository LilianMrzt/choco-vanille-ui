import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from '@components/overlay/drawer'
import DrawerDocsPage from './components/drawer-docs-page/DrawerDocsPage'
import DrawerUncontrolled from './components/drawer-uncontrolled/DrawerUncontrolled'
import DrawerExample from './components/drawer-example/DrawerExample'
import DrawerSizes from './components/drawer-sizes/DrawerSizes'
import DrawerAppearance from './components/drawer-appearance/DrawerAppearance'
import { ARG_TYPES, DEFAULT_ARGS } from './constants'
import sizesSource from './sources/Sizes.source.txt?raw'
import appearanceSource from './sources/DrawerAppearance.source.txt?raw'
import uncontrolledSource from './sources/Uncontrolled.source.txt?raw'
import type { DrawerPlaygroundArgs } from './types'
import { createDrawerSource } from './utils/create-drawer-source/createDrawerSource.utils'
import { playDrawer } from './utils/playDrawer.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, marginInline: 'auto', overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'padded',
        docs: {
            page: DrawerDocsPage,
            description: { component: 'A side drawer with portal, inline and mini modes. Compose its header, body, grouped navigation and actions; href with onClick supports application-owned client-side routing.' },
            source: { type: 'dynamic', transform: createDrawerSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    render: DrawerExample,
} satisfies Meta<DrawerPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { play: playDrawer }
export const Uncontrolled: Story = {
    render: DrawerUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The drawer owns its open state and is remounted when the initial state changes.' } } },
}
export const Inline: Story = { args: { open: false, mode: 'inline', size: 'sm' }, parameters: { docs: { description: { story: 'Inline mode participates in the surrounding layout and collapses when closed.' } } } }
export const Mini: Story = { args: { open: false, mode: 'mini', size: 'sm' }, parameters: { docs: { description: { story: 'Mini mode stays visible as a narrow rail when collapsed.' } } } }
export const Sizes: Story = { render: DrawerSizes, parameters: { docs: { ...storySource(sizesSource) } } }
export const Appearance: Story = {
    render: DrawerAppearance,
    parameters: { docs: { ...storySource(appearanceSource), description: { story: 'Every item variant × semantic color for navigation and actions, at one consistent local width. Hover or focus the rows to compare their interaction colors; width presets remain in Sizes.' } } },
}
