import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomSheet } from '@components/overlay/bottom-sheet'
import BottomSheetDocsPage from './components/docs-page/DocsPage'
import BottomSheetPlayground from './components/playground/BottomSheetPlayground'
import BottomSheetUncontrolled from './components/uncontrolled/BottomSheetUncontrolled'
import BottomSheetWithIcons from './components/with-icons/BottomSheetWithIcons'
import BottomSheetStates from './components/states/BottomSheetStates'
import { ARG_TYPES, DEFAULT_ARGS } from './constants'
import withIconsSource from './sources/WithIcons.source.txt?raw'
import statesSource from './sources/States.source.txt?raw'
import uncontrolledSource from './sources/Uncontrolled.source.txt?raw'
import type { BottomSheetPlaygroundArgs } from './types'
import { createBottomSheetSource } from './utils/create-bottom-sheet-source/createBottomSheetSource.utils'
import { playBottomSheet } from './utils/playBottomSheet.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/BottomSheet',
    component: BottomSheet,
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
            page: BottomSheetDocsPage,
            description: { component: 'A bottom-edge modal sheet for contextual actions and single-choice pickers. Its large rows support touch, and the sheet supports swipe-to-dismiss.' },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<BottomSheetPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    render: BottomSheetPlayground,
    play: playBottomSheet,
    parameters: { docs: { source: { type: 'dynamic', transform: createBottomSheetSource } } },
}
export const Uncontrolled: Story = {
    render: BottomSheetUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The sheet owns its open state. Initial defaultOpen changes require a remount.' } } },
}
export const WithIcons: Story = { render: BottomSheetWithIcons, parameters: { docs: { ...storySource(withIconsSource) } } }
export const States: Story = { render: BottomSheetStates, parameters: { docs: { ...storySource(statesSource) } } }
