import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { DialogStoryArgs } from '@stories/overlay/dialog/types'
import sourceTemplate from '@stories/overlay/dialog/utils/create-dialog-source/sources/createDialogSource.source.txt?raw'
import footerTemplate from '@stories/overlay/dialog/utils/create-dialog-source/sources/footer.source.txt?raw'
import stateTemplate from '@stories/overlay/dialog/utils/create-dialog-source/sources/state.source.txt?raw'
import stateImportSource from '@stories/overlay/dialog/utils/create-dialog-source/sources/state-import.source.txt?raw'

/**
 * Serializes a string, number or boolean JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns The JSX attribute or an empty string.
 * @example
 * serializeAttribute('size', 'md')
 */
const serializeAttribute = (name: string, value: string | number | boolean | null | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public dialog JSX for current root and composition controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current root and demonstration props.
 * @returns Consumer JSX for the displayed composition.
 * @example
 * createDialogSource('', { args: { open: false, title: 'Settings' } })
 */
export const createDialogSource = (_source: string, { args }: Readonly<{ args: DialogStoryArgs }>): string => {
    const isControlled = args.open !== undefined
    const rootProps = [
        isControlled ? ' open={open} onOpenChange={setOpen}' : serializeAttribute('defaultOpen', args.defaultOpen),
        serializeAttribute('modal', args.modal),
        serializeAttribute('disablePointerDismissal', args.disablePointerDismissal),
        serializeAttribute('triggerId', args.triggerId),
        serializeAttribute('defaultTriggerId', args.defaultTriggerId),
    ].join('')
    const headerProps = serializeAttribute('title', args.title) +
        serializeAttribute('titleAs', args.titleAs) +
        serializeAttribute('showCloseButton', args.showCloseButton) +
        (args.showDescription ? serializeAttribute('description', args.description) : '')
    const footer = args.showFooter
        ? renderSource(footerTemplate, {
            cancelLabel: JSON.stringify(args.cancelLabel ?? 'Cancel'),
            confirmLabel: JSON.stringify(args.confirmLabel ?? 'Save changes'),
        })
        : ''

    return renderSource(sourceTemplate, {
        stateImport: isControlled ? stateImportSource : '',
        state: isControlled ? renderSource(stateTemplate, { open: JSON.stringify(args.open) }) : '',
        rootProps,
        contentProps: serializeAttribute('size', args.size) + serializeAttribute('defaultAriaLabel', args.contentLabel),
        bodyProps: serializeAttribute('padding', args.bodyPadding),
        headerProps,
        footer,
    })
}
