import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CollapsibleStoryArgs } from '@stories/surfaces/collapsible/types'
import sourceTemplate from '@stories/surfaces/collapsible/utils/create-collapsible-source/sources/createCollapsibleSource.source.tsx.txt?raw'

/**
 * Serializes a string or number as a JSX attribute.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Serializable attribute value.
 * @returns A JSX attribute or an empty string.
 * @example
 * serializeAttribute('padding', 12)
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public compound JSX for the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current root props and slot controls.
 * @returns Consumer JSX for the visible composition.
 * @example
 * createCollapsibleSource('', { args: { triggerLabel: 'Details', open: false } })
 */
export const createCollapsibleSource = (_source: string, { args }: Readonly<{ args: CollapsibleStoryArgs }>): string => {
    const controlled = args.open !== undefined
    const rootProps = [
        serializeAttribute('width', args.width),
        args.disabled ? ' disabled' : '',
        controlled ? ' open={open} onOpenChange={setOpen}' : '',
        !controlled && args.defaultOpen !== undefined ? ` defaultOpen={${args.defaultOpen}}` : '',
    ].join('')
    const triggerProps = [
        serializeAttribute('label', args.triggerLabel),
        args.triggerStartIcon ? ' startIcon={InfoIcon}' : '',
        args.triggerEndIcon ? ' endIcon={InfoIcon}' : '',
        args.triggerWidth === undefined ? '' : ` style={{ width: ${JSON.stringify(args.triggerWidth)} }}`,
    ].join('')
    const panelProps = serializeAttribute('padding', args.panelPadding)
    const stateImport = controlled ? "import { useState } from 'react'\n" : ''
    const state = controlled ? `const Example = () => {\n    const [open, setOpen] = useState(${args.open})\n\n    return (\n` : ''
    const end = controlled ? '\n    )\n}' : ''

    return renderSource(sourceTemplate, { rootProps, triggerProps, panelProps, stateImport, state, end })
}
