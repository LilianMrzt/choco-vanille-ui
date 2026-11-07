import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { AlertDialogStoryArgs } from '@stories/overlay/alert-dialog/types'
import sourceTemplate from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/sources/createAlertDialogSource.source.txt?raw'
import bodySource from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/sources/body.source.txt?raw'
import stateTemplate from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/sources/state.source.txt?raw'
import stateImportSource from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/sources/state-import.source.txt?raw'

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
        ? bodySource.trimEnd()
        : ''

    return renderSource(sourceTemplate, {
        stateImport: isControlled ? stateImportSource : '',
        typographyImport: args.showBody ? ', Typography' : '',
        state: isControlled ? renderSource(stateTemplate, { open: JSON.stringify(args.open) }) : '',
        rootProps,
        triggerLabel: JSON.stringify(args.triggerLabel ?? 'Delete account'),
        contentProps: serializeAttribute('size', args.size) + serializeAttribute('defaultAriaLabel', args.contentLabel),
        headerProps: serializeAttribute('description', args.description) + serializeAttribute('title', args.title) +
            serializeAttribute('titleAs', args.titleAs) + serializeAttribute('showCloseButton', args.showCloseButton),
        body,
        cancelLabel: JSON.stringify(args.cancelLabel ?? 'Cancel'),
        actionLabel: JSON.stringify(args.actionLabel ?? 'Delete account'),
    })
}
