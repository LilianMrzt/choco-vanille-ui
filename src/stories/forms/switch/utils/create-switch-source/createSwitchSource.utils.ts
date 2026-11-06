import type { SwitchProps } from '@components/forms/switch'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/forms/switch/utils/create-switch-source/sources/createSwitchSource.source.tsx.txt?raw'

/**
 * Serializes a string-valued JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns A JSX attribute or an empty string.
 * @example
 * serializeAttribute('label', 'Airplane mode')
 */
const serializeAttribute = (name: string, value: string | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public Switch JSX for the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current switch props.
 * @returns Consumer JSX for the switch.
 * @example
 * createSwitchSource('', { args: { label: 'Airplane mode', defaultChecked: true } })
 */
export const createSwitchSource = (_source: string, { args }: Readonly<{ args: SwitchProps }>): string => {
    const props = [
        serializeAttribute('label', args.label),
        serializeAttribute('aria-label', args['aria-label']),
        serializeAttribute('aria-labelledby', args['aria-labelledby']),
        serializeAttribute('aria-describedby', args['aria-describedby']),
        serializeAttribute('helperText', args.helperText),
        serializeAttribute('error', args.error),
        serializeAttribute('size', args.size),
        serializeAttribute('id', args.id),
        serializeAttribute('name', args.name),
        serializeAttribute('value', args.value),
        serializeAttribute('uncheckedValue', args.uncheckedValue),
        args.disabled ? ' disabled' : '',
        args.readOnly ? ' readOnly' : '',
        args.required ? ' required' : '',
        args.checked === undefined ? '' : ' checked={checked} onCheckedChange={setChecked}',
        args.checked === undefined && args.defaultChecked !== undefined ? ` defaultChecked={${args.defaultChecked}}` : '',
    ].join('')

    const stateImport = args.checked === undefined ? '' : "import { useState } from 'react'\n"
    const state = args.checked === undefined ? '' : `const Example = () => {\n    const [checked, setChecked] = useState(${args.checked})\n\n    return `
    const end = args.checked === undefined ? '' : '\n}'

    return renderSource(sourceTemplate, { props, stateImport, state, end })
}
