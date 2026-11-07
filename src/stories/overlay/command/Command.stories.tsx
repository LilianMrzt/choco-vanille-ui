import type { Meta, StoryObj } from '@storybook/react-vite'
import { Command } from '@components/overlay/command'
import CommandDocsPage from './components/command-docs-page/CommandDocsPage'
import CommandPlayground from './components/command-playground/CommandPlayground'
import CommandSizes from './components/command-sizes/CommandSizes'
import CommandStates from './components/command-states/CommandStates'
import CommandWithIcons from './components/command-with-icons/CommandWithIcons'
import CommandControlledOpen from './components/command-controlled-open/CommandControlledOpen'
import { ARG_TYPES, DEFAULT_ARGS } from './constants'
import sizesSource from './sources/Sizes.source.txt?raw'
import statesSource from './sources/States.source.txt?raw'
import iconsSource from './sources/WithIcons.source.txt?raw'
import type { CommandPlaygroundArgs } from './types'
import { createCommandSource } from './utils/create-command-source/createCommandSource.utils'
import { createControlledCommandSource } from './utils/create-controlled-command-source/createControlledCommandSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/Command',
    component: Command,
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
            page: CommandDocsPage,
            description: { component: 'A modal command palette for action search and keyboard navigation. Compose its trigger, input and grouped actions, with empty results and optional shortcuts.' },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<CommandPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { render: CommandPlayground, parameters: { docs: { source: { type: 'dynamic', transform: createCommandSource } } } }
export const Sizes: Story = { render: CommandSizes, parameters: { docs: { ...storySource(sizesSource) } } }
export const States: Story = { render: CommandStates, parameters: { docs: { ...storySource(statesSource) } } }
export const WithIcons: Story = { render: CommandWithIcons, parameters: { docs: { ...storySource(iconsSource) } } }
export const ControlledOpen: Story = {
    render: CommandControlledOpen,
    parameters: { docs: { description: { story: 'An external button opens the controlled palette. Component changes still forward cancellable event details and update Controls.' }, source: { type: 'dynamic', transform: createControlledCommandSource } } },
}
