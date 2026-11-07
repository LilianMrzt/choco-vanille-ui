import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { FieldsetPlaygroundArgs } from '@stories/forms/primitives/fieldset/types'
import template from '@stories/forms/primitives/fieldset/utils/create-fieldset-source/sources/createFieldsetSource.source.tsx.txt?raw'

/**
 * Builds consumer JSX from the editable fieldset controls.
 * @internal Not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current fieldset and demonstration props.
 * @returns Public consumer JSX.
 * @example
 * createFieldsetSource('', { args: { legend: 'Plan', disabled: true } })
 */
export const createFieldsetSource = (_source: string, { args }: Readonly<{ args: FieldsetPlaygroundArgs }>): string => {
    const disabled = args.disabled ? ' disabled' : ''
    const name = args.name === undefined ? '' : ` name={${JSON.stringify(args.name)}}`
    const form = args.form === undefined ? '' : ` form={${JSON.stringify(args.form)}}`
    const className = args.className === undefined ? '' : ` className={${JSON.stringify(args.className)}}`
    const style = args.style === undefined ? '' : ` style={${JSON.stringify(args.style)}}`

    return renderSource(template, {
        attributes: disabled + name + form + className + style,
        legend: args.legend === undefined ? 'undefined' : JSON.stringify(args.legend),
        radioDisabled: disabled,
    })
}
