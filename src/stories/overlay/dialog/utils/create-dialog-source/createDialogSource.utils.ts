import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { DialogStoryArgs } from '@stories/overlay/dialog/types'
import sourceTemplate from '@stories/overlay/dialog/utils/create-dialog-source/sources/createDialogSource.source.tsx.txt?raw'

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
        (args.showDescription ? serializeAttribute('description', args.description) : '')
    const footer = args.showFooter
        ? `\n      <Dialog.Footer>\n        <Dialog.Close>\n          <Button color="primary" label={${JSON.stringify(args.cancelLabel ?? 'Cancel')}} size="sm" variant="outlined" />\n        </Dialog.Close>\n        <Button color="primary" label={${JSON.stringify(args.confirmLabel ?? 'Save changes')}} size="sm" variant="contained" />\n      </Dialog.Footer>`
        : ''

    return renderSource(sourceTemplate, {
        stateImport: isControlled ? "import { useState } from 'react'\n" : '',
        state: isControlled ? `  const [open, setOpen] = useState(${JSON.stringify(args.open)})\n\n` : '',
        rootProps,
        contentProps: serializeAttribute('size', args.size),
        headerProps,
        footer,
    })
}
