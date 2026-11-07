import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Dialog } from '@components/overlay/dialog'
import DialogDocsPage from '@stories/overlay/dialog/components/dialog-docs-page/DialogDocsPage'
import DialogExample from '@stories/overlay/dialog/components/dialog-example/DialogExample'
import DialogSizes from '@stories/overlay/dialog/components/dialog-sizes/DialogSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/dialog/constants'
import sizesSource from '@stories/overlay/dialog/sources/DialogSizes.source.txt?raw'
import type { DialogStoryArgs } from '@stories/overlay/dialog/types'
import { createDialogSource } from '@stories/overlay/dialog/utils/create-dialog-source/createDialogSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/Dialog',
    component: Dialog,
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
                component: 'A dialog for focused interactions. Compose its trigger, content and optional sections to present the information and actions.',
            },
            page: DialogDocsPage,
            source: {
                type: 'dynamic',
                transform: createDialogSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<DialogStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes dialog state with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render args; current values come from useArgs.
 * @returns The controlled dialog example.
 * @example
 * ControlledDialog(args)
 */
const ControlledDialog = (_args: DialogStoryArgs) => {
    const [args, updateArgs] = useArgs<DialogStoryArgs>()

    /**
     * Forwards change details and applies uncanceled changes to Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Change event details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<DialogStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)

        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <DialogExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledDialog,
}

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <DialogExample
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

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: DialogSizes,
}
