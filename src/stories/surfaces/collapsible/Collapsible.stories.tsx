import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Collapsible } from '@components/surfaces/collapsible'
import CollapsibleDocsPage from '@stories/surfaces/collapsible/components/collapsible-docs-page/CollapsibleDocsPage'
import CollapsibleExample from '@stories/surfaces/collapsible/components/collapsible-example/CollapsibleExample'
import CollapsibleStates from '@stories/surfaces/collapsible/components/collapsible-states/CollapsibleStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/surfaces/collapsible/constants'
import statesSource from '@stories/surfaces/collapsible/sources/CollapsibleStates.source.txt?raw'
import type { CollapsibleStoryArgs } from '@stories/surfaces/collapsible/types'
import { createCollapsibleSource } from '@stories/surfaces/collapsible/utils/create-collapsible-source/createCollapsibleSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Surfaces/Collapsible',
    component: Collapsible,
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
            page: CollapsibleDocsPage,
            description: {
                component: 'Show or hide a single block of content with a trigger and an animated panel. Compose the trigger and panel inside the root.',
            },
            source: {
                type: 'dynamic',
                transform: createCollapsibleSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<CollapsibleStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes the controlled composition with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render args; current values come from useArgs.
 * @returns The controlled composition.
 * @example
 * <ControlledCollapsible />
 */
const ControlledCollapsible = (_args: CollapsibleStoryArgs) => {
    const [args, updateArgs] = useArgs<CollapsibleStoryArgs>()

    /**
     * Forwards the complete event and applies uncanceled changes to Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Change event details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<CollapsibleStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)

        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <CollapsibleExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledCollapsible,
}

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: true },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <CollapsibleExample
            {...args}
            key={String(args.defaultOpen)}
        />
    ),
    parameters: {
        docs: {
            description: { story: 'The initial open state applies on mount; remount to apply changes to defaultOpen.' },
        },
    },
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: CollapsibleStates,
}
