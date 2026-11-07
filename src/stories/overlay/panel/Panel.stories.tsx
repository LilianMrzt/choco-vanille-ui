import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Panel } from '@components/overlay/panel'
import PanelDocsPage from '@stories/overlay/panel/components/panel-docs-page/PanelDocsPage'
import PanelExample from '@stories/overlay/panel/components/panel-example/PanelExample'
import PanelHeaderActions from '@stories/overlay/panel/components/panel-header-actions/PanelHeaderActions'
import PanelAppearance from './components/panel-appearance/PanelAppearance'
import PanelWidths from './components/panel-widths/PanelWidths'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/panel/constants'
import headerActionsSource from '@stories/overlay/panel/sources/PanelHeaderActions.source.txt?raw'
import appearanceSource from './sources/PanelAppearance.source.txt?raw'
import sizesSource from './sources/PanelSizes.source.txt?raw'
import type { PanelStoryArgs } from '@stories/overlay/panel/types'
import { createPanelSource } from '@stories/overlay/panel/utils/create-panel-source/createPanelSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/Panel',
    component: Panel,
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
                component: 'A side panel for focused content and actions. Compose its trigger, content and header to provide an accessible title and close control.',
            },
            page: PanelDocsPage,
            source: {
                type: 'dynamic',
                transform: createPanelSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<PanelStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes the controlled panel with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render args; current values come from useArgs.
 * @returns The controlled panel example.
 * @example
 * ControlledPanel(args)
 */
const ControlledPanel = (_args: PanelStoryArgs) => {
    const [args, updateArgs] = useArgs<PanelStoryArgs>()

    /**
     * Forwards change details and applies uncanceled changes to Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Change event details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<PanelStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)

        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <PanelExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledPanel,
}

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <PanelExample
            {...args}
            key={JSON.stringify([args.defaultOpen, args.defaultTriggerId])}
        />
    ),
    parameters: {
        docs: {
            description: { story: 'The initial open state applies on mount; remount to apply changes to defaultOpen.' },
        },
    },
}

export const HeaderActions: Story = { parameters: { docs: { ...storySource(headerActionsSource) } }, render: PanelHeaderActions }
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource), description: { story: 'Compare left and right placement at the same content width.' } } },
    render: PanelAppearance,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare narrow and wide panel content independently of placement. Portalled panels remain constrained by the viewport.' } } },
    render: PanelWidths,
}
