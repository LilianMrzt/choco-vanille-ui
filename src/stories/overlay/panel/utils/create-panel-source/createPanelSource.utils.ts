import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { PanelStoryArgs } from '@stories/overlay/panel/types'
import sourceTemplate from '@stories/overlay/panel/utils/create-panel-source/sources/createPanelSource.source.tsx.txt?raw'

/**
 * Serializes a string or boolean JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns The JSX attribute or an empty string.
 * @example
 * serializeAttribute('position', 'left')
 */
const serializeAttribute = (name: string, value: string | boolean | null | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public panel JSX for the current root and slot controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current root and demonstration props.
 * @returns Consumer JSX for the displayed panel.
 * @example
 * createPanelSource('', { args: { open: false, title: 'Settings' } })
 */
export const createPanelSource = (_source: string, { args }: Readonly<{ args: PanelStoryArgs }>): string => {
    const isControlled = args.open !== undefined
    const rootProps = [
        isControlled ? ' open={open} onOpenChange={setOpen}' : serializeAttribute('defaultOpen', args.defaultOpen),
        serializeAttribute('modal', args.modal),
        serializeAttribute('withBackdrop', args.withBackdrop),
        serializeAttribute('disablePointerDismissal', args.disablePointerDismissal),
        serializeAttribute('triggerId', args.triggerId),
        serializeAttribute('defaultTriggerId', args.defaultTriggerId),
    ].join('')

    return renderSource(sourceTemplate, {
        stateImport: isControlled ? "import { useState } from 'react'\n" : '',
        state: isControlled ? `  const [open, setOpen] = useState(${JSON.stringify(args.open)})\n\n` : '',
        rootProps,
        contentProps: serializeAttribute('position', args.position) + serializeAttribute('width', args.width),
        headerProps: (args.showDescription ? serializeAttribute('description', args.description) : '') +
            serializeAttribute('title', args.title),
    })
}
