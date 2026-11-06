import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { HoverCard } from '@components/overlay/hover-card'
import HoverCardDocsPage from '@stories/overlay/hover-card/components/hover-card-docs-page/HoverCardDocsPage'
import HoverCardExample from '@stories/overlay/hover-card/components/hover-card-example/HoverCardExample'
import { ARG_TYPES, DEFAULT_ARGS, type HoverCardStoryArgs } from '@stories/overlay/hover-card/constants'
import { createHoverCardSource } from '@stories/overlay/hover-card/utils/create-hover-card-source/createHoverCardSource.utils'

const meta = {
    title: 'Overlay/HoverCard',
    component: HoverCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: { component: 'A preview card shown when hovering or focusing its trigger.' },
            page: HoverCardDocsPage,
            source: { type: 'dynamic', transform: createHoverCardSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<HoverCardStoryArgs>

export default meta

type Story = StoryObj<HoverCardStoryArgs>

/**
 * Synchronizes preview card state with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The controlled preview card.
 * @example
 * <ControlledHoverCard />
 */
const ControlledHoverCard = () => {
    const [args, updateArgs] = useArgs<HoverCardStoryArgs>()

    /**
     * Forwards Base UI event details and applies uncanceled changes.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Base UI change details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<HoverCardStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)
        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <HoverCardExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = { render: ControlledHoverCard }

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    parameters: { docs: { description: { story: 'Remount the component to apply a changed defaultOpen value.' } } },
    render: HoverCardExample,
}
