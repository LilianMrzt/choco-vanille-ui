import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Tooltip } from '@components/overlay/tooltip'
import TooltipDocsPage from '@stories/overlay/tooltip/components/tooltip-docs-page/TooltipDocsPage'
import TooltipExample from '@stories/overlay/tooltip/components/tooltip-example/TooltipExample'
import TooltipStates from '@stories/overlay/tooltip/components/tooltip-states/TooltipStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/tooltip/constants'
import type { TooltipStoryArgs } from './types'
import statesSource from '@stories/overlay/tooltip/sources/TooltipStates.source.txt?raw'
import { createTooltipSource } from '@stories/overlay/tooltip/utils/create-tooltip-source/createTooltipSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/Tooltip',
    component: Tooltip,
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
            description: { component: 'Supplementary text displayed on hover or keyboard focus.' },
            page: TooltipDocsPage,
            source: { type: 'dynamic', transform: createTooltipSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<TooltipStoryArgs>

export default meta

type Story = StoryObj<TooltipStoryArgs>

/**
 * Synchronizes tooltip state with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The controlled tooltip.
 * @example
 * <ControlledTooltip />
 */
const ControlledTooltip = () => {
    const [args, updateArgs] = useArgs<TooltipStoryArgs>()

    /**
     * Forwards and applies the requested open state.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @returns Nothing.
     * @example
     * handleOpenChange(true)
     */
    const handleOpenChange = (open: boolean): void => {
        args.onOpenChange?.(open)
        updateArgs({ open })
    }

    return (
        <TooltipExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = { render: ControlledTooltip }

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    parameters: { docs: { description: { story: 'Remount the component to apply a changed defaultOpen value.' } } },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <TooltipExample
            {...args}
            key={String(args.defaultOpen)}
        />
    ),
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: TooltipStates,
}
