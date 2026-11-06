import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { AlertDialogStoryArgs } from '@stories/overlay/alert-dialog/types'
import sourceTemplate from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/sources/createAlertDialogSource.source.tsx.txt?raw'

/**
 * Serializes a string or boolean JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns The JSX attribute or an empty string.
 * @example
 * serializeAttribute('size', 'md')
 */
const serializeAttribute = (name: string, value: string | boolean | null | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public confirmation-dialog JSX for current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current root and demonstration props.
 * @returns Consumer JSX for the displayed composition.
 * @example
 * createAlertDialogSource('', { args: { open: false, title: 'Confirm' } })
 */
export const createAlertDialogSource = (_source: string, { args }: Readonly<{ args: AlertDialogStoryArgs }>): string => {
    const isControlled = args.open !== undefined
    const rootProps = [
        isControlled ? ' open={open} onOpenChange={setOpen}' : serializeAttribute('defaultOpen', args.defaultOpen),
        serializeAttribute('modal', args.modal),
        serializeAttribute('disablePointerDismissal', args.disablePointerDismissal),
        serializeAttribute('triggerId', args.triggerId),
        serializeAttribute('defaultTriggerId', args.defaultTriggerId),
    ].join('')
    const body = args.showBody
        ? '\n        <AlertDialog.Body>\n          <Typography>Your account and its data will be permanently deleted.</Typography>\n        </AlertDialog.Body>'
        : ''

    return renderSource(sourceTemplate, {
        stateImport: isControlled ? "import { useState } from 'react'\n" : '',
        typographyImport: args.showBody ? ', Typography' : '',
        state: isControlled ? `  const [open, setOpen] = useState(${JSON.stringify(args.open)})\n\n` : '',
        rootProps,
        triggerLabel: JSON.stringify(args.triggerLabel ?? 'Delete account'),
        contentProps: serializeAttribute('size', args.size),
        headerProps: serializeAttribute('description', args.description) + serializeAttribute('title', args.title),
        body,
        cancelLabel: JSON.stringify(args.cancelLabel ?? 'Cancel'),
        actionLabel: JSON.stringify(args.actionLabel ?? 'Delete account'),
    })
}
