import type { SwitchProps } from '@components/forms/switch'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/forms/switch/utils/create-switch-source/sources/createSwitchSource.source.txt?raw'
import attributeTemplate from '@stories/forms/switch/utils/create-switch-source/sources/Attribute.source.txt?raw'
import stateImportTemplate from '@stories/forms/switch/utils/create-switch-source/sources/StateImport.source.txt?raw'
import stateTemplate from '@stories/forms/switch/utils/create-switch-source/sources/State.source.txt?raw'
import checkedAttributes from '@stories/forms/switch/utils/create-switch-source/sources/CheckedAttributes.source.txt?raw'

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
    value === undefined ? '' : ' ' + renderSource(attributeTemplate, { name, value: JSON.stringify(value) })

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
        args.checked === undefined ? '' : checkedAttributes.trimEnd(),
        args.checked === undefined && args.defaultChecked !== undefined
            ? ' ' + renderSource(attributeTemplate, { name: 'defaultChecked', value: String(args.defaultChecked) })
            : '',
    ].join('')

    const stateImport = args.checked === undefined ? '' : stateImportTemplate
    const state = args.checked === undefined ? '' : renderSource(stateTemplate, { checked: String(args.checked) }).trimEnd() + ' '
    const end = args.checked === undefined ? '' : '\n}'

    return renderSource(sourceTemplate, { props, stateImport, state, end })
}
