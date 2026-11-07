import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomNavigation } from '@components/navigation/bottom-navigation'
import BottomNavigationDocsPage from './components/docs-page/DocsPage'
import BottomNavigationPlayground from './components/playground/BottomNavigationPlayground'
import BottomNavigationUncontrolled from './components/uncontrolled/BottomNavigationUncontrolled'
import BottomNavigationAppearance from './components/appearance/BottomNavigationAppearance'
import BottomNavigationSizes from './components/sizes/BottomNavigationSizes'
import BottomNavigationStates from './components/states/BottomNavigationStates'
import BottomNavigationIconOnly from './components/icon-only/BottomNavigationIconOnly'
import BottomNavigationClientSideNavigation from './components/client-side-navigation/BottomNavigationClientSideNavigation'
import { ARG_TYPES, DEFAULT_ARGS } from './constants'
import statesSource from './sources/States.source.txt?raw'
import appearanceSource from './sources/Bordered.source.txt?raw'
import iconOnlySource from './sources/IconOnly.source.txt?raw'
import clientSideSource from './sources/ClientSideNavigation.source.txt?raw'
import uncontrolledSource from './sources/Uncontrolled.source.txt?raw'
import type { BottomNavigationStoryArgs } from './types'
import { createBottomNavigationSource } from './utils/create-bottom-navigation-source/createBottomNavigationSource.utils'
import { createSizesSource } from './utils/create-sizes-source/createSizesSource.utils'
import { playNavigation, playClientSideNavigation } from './utils/playNavigation.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/BottomNavigation',
    component: BottomNavigation,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 'min(48rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, marginInline: 'auto', overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'padded',
        docs: {
            page: BottomNavigationDocsPage,
            source: { type: 'dynamic', transform: createBottomNavigationSource },
            description: { component: 'A safe-area-aware navigation surface that fills its local parent. Examples use a bounded frame; the application owns fixed or sticky placement and routing.' },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<BottomNavigationStoryArgs>

export default meta

type Story = StoryObj<BottomNavigationStoryArgs>

export const Playground: Story = { render: BottomNavigationPlayground, play: playNavigation }
export const Uncontrolled: Story = {
    render: BottomNavigationUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The initial selection applies on mount; remount to apply a new defaultValue.' } } },
}
export const Appearance: Story = {
    render: BottomNavigationAppearance,
    parameters: { docs: { ...storySource(appearanceSource), description: { story: 'The bordered surface at the default item height. Dimension comparisons are in Sizes.' } } },
}
export const Sizes: Story = {
    render: BottomNavigationSizes,
    parameters: { docs: { ...storySource(createSizesSource()), description: { story: 'Compare item heights and narrow/wide local parents independently. The desktop frame stays bounded and narrow containers scroll locally when needed.' } } },
}
export const States: Story = { render: BottomNavigationStates, parameters: { docs: { ...storySource(statesSource) } } }
export const IconOnly: Story = { render: BottomNavigationIconOnly, parameters: { docs: { ...storySource(iconOnlySource) } } }
export const ClientSideNavigation: Story = {
    render: BottomNavigationClientSideNavigation,
    parameters: { docs: { ...storySource(clientSideSource), description: { story: 'href provides a native-link fallback; onClick owns client-side route changes and prevents native navigation.' } } },
    play: playClientSideNavigation,
}
