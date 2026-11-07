import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Popover } from '@components/overlay/popover'
import PopoverDocsPage from '@stories/overlay/popover/components/popover-docs-page/PopoverDocsPage'
import PopoverExample from '@stories/overlay/popover/components/popover-example/PopoverExample'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/popover/constants'
import type { PopoverStoryArgs } from './types'
import { createPopoverSource } from '@stories/overlay/popover/utils/create-popover-source/createPopoverSource.utils'

const meta = {
    title: 'Overlay/Popover',
    component: Popover,
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
            description: { component: 'A floating panel composed from a trigger, content and optional action items.' },
            page: PopoverDocsPage,
            source: { type: 'dynamic', transform: createPopoverSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<PopoverStoryArgs>

export default meta

type Story = StoryObj<PopoverStoryArgs>

/**
 * Synchronizes popover state with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The controlled popover.
 * @example
 * <ControlledPopover />
 */
const ControlledPopover = () => {
    const [args, updateArgs] = useArgs<PopoverStoryArgs>()

    /**
     * Forwards Base UI event details and applies uncanceled changes.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Base UI change details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<PopoverStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)
        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <PopoverExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = { render: ControlledPopover }

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    parameters: {
        docs: { description: { story: 'Remount the component to apply a changed defaultOpen value.' } },
    },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <PopoverExample
            {...args}
            key={String(args.defaultOpen)}
        />
    ),
}
