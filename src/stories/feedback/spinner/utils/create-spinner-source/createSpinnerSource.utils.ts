import type { SpinnerProps } from '@components/feedback/spinner'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/feedback/spinner/utils/create-spinner-source/sources/createSpinnerSource.source.txt?raw'

/**
 * Serializes a string-valued JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns A JSX attribute or an empty string.
 * @example
 * serializeAttribute('size', 'sm')
 */
const serializeAttribute = (name: string, value: string | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates consumer JSX for the current spinner controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current spinner props.
 * @returns Consumer JSX reflecting the editable controls.
 * @example
 * createSpinnerSource('', { args: { size: 'sm', 'aria-label': 'Loading' } })
 */
export const createSpinnerSource = (_source: string, { args }: Readonly<{ args: SpinnerProps }>): string => {
    const attributes = [
        serializeAttribute('size', args.size),
        serializeAttribute('color', args.color),
        serializeAttribute('role', args.role),
        serializeAttribute('aria-label', args['aria-label']),
        serializeAttribute('className', args.className),
    ].join('')

    return renderSource(sourceTemplate, { attributes })
}
