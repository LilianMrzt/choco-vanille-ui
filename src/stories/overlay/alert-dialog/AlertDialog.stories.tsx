import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { AlertDialog } from '@components/overlay/alert-dialog'
import AlertDialogDocsPage from '@stories/overlay/alert-dialog/components/alert-dialog-docs-page/AlertDialogDocsPage'
import AlertDialogExample from '@stories/overlay/alert-dialog/components/alert-dialog-example/AlertDialogExample'
import AlertDialogSizes from '@stories/overlay/alert-dialog/components/alert-dialog-sizes/AlertDialogSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/alert-dialog/constants'
import sizesSource from '@stories/overlay/alert-dialog/sources/AlertDialogSizes.source.tsx.txt?raw'
import type { AlertDialogStoryArgs } from '@stories/overlay/alert-dialog/types'
import { createAlertDialogSource } from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/createAlertDialogSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Overlay/AlertDialog',
    component: AlertDialog,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A confirmation dialog for actions that require a decision. Compose the trigger, content and action slots to provide context and a safe exit.',
            },
            page: AlertDialogDocsPage,
            source: {
                type: 'dynamic',
                transform: createAlertDialogSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<AlertDialogStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes the controlled confirmation dialog with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render args; current values come from useArgs.
 * @returns The controlled dialog example.
 * @example
 * ControlledAlertDialog(args)
 */
const ControlledAlertDialog = (_args: AlertDialogStoryArgs) => {
    const [args, updateArgs] = useArgs<AlertDialogStoryArgs>()

    /**
     * Forwards change details and applies uncanceled changes to Controls.
     * @internal Storybook-only handler; not part of the public package API.
     * @param open - Requested open state.
     * @param details - Change event details.
     * @returns Nothing.
     * @example
     * handleOpenChange(true, details)
     */
    const handleOpenChange: NonNullable<AlertDialogStoryArgs['onOpenChange']> = (open, details) => {
        args.onOpenChange?.(open, details)

        if (!details.isCanceled) {
            updateArgs({ open })
        }
    }

    return (
        <AlertDialogExample
            {...args}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledAlertDialog,
}

export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    render: (args) => <AlertDialogExample {...args} />,
    parameters: {
        docs: {
            description: { story: 'The initial open state applies on mount; remount to apply changes to defaultOpen.' },
        },
    },
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: AlertDialogSizes,
}
