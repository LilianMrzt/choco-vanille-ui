import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { ContextMenu } from '@components/overlay/context-menu'
import ContextMenuDocsPage from '@stories/overlay/context-menu/components/context-menu-docs-page/ContextMenuDocsPage'
import ContextMenuExample from '@stories/overlay/context-menu/components/context-menu-example/ContextMenuExample'
import ContextMenuStates from '@stories/overlay/context-menu/components/context-menu-states/ContextMenuStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/context-menu/constants'
import statesSource from '@stories/overlay/context-menu/sources/States.source.tsx.txt?raw'
import type { ContextMenuStoryArgs } from '@stories/overlay/context-menu/types'
import { createContextMenuSource } from '@stories/overlay/context-menu/utils/create-context-menu-source/createContextMenuSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: ContextMenuDocsPage,
            description: { component: 'A contextual menu opened by right click, long press or keyboard.' },
            source: { type: 'dynamic', transform: createContextMenuSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<ContextMenuStoryArgs>

export default meta
type Story = StoryObj<ContextMenuStoryArgs>

/**
 * Synchronizes menu state with Controls.
 * @internal Storybook-only renderer; not part of the public package API.
 * @returns The controlled menu example.
 * @example
 * <ControlledContextMenu />
 */
const ControlledContextMenu = () => {
    const [args, updateArgs] = useArgs<ContextMenuStoryArgs>()
    return (
        <ContextMenuExample
            {...args}
            onOpenChange={(open, details) => {
                args.onOpenChange?.(open, details)
                if (!details.isCanceled) {
                    updateArgs({ open })
                }
            }}
        />
    )
}

export const Playground: Story = { render: ControlledContextMenu }
export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    render: ContextMenuExample,
    parameters: { docs: { description: { story: 'Changing defaultOpen requires remounting the example.' } } },
}
export const States: Story = { render: ContextMenuStates, parameters: { docs: { ...storySource(statesSource) } } }
