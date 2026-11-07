import type { ButtonProps } from '@components/actions/button'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/actions/button/utils/create-button-source/sources/createButtonSource.source.txt?raw'

/**
 * Serializes a string or number as a JSX attribute.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Serializable attribute value.
 * @returns A JSX attribute or an empty string.
 * @example
 * serializeAttribute('size', 'md')
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public Button JSX for the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current button props.
 * @returns Consumer JSX reflecting the rendered props.
 * @example
 * createButtonSource('', { args: { label: 'Save' } })
 */
export const createButtonSource = (_source: string, { args }: Readonly<{ args: ButtonProps }>): string => {
    const props = [
        serializeAttribute('label', args.label),
        serializeAttribute('href', args.href),
        serializeAttribute('variant', args.variant),
        serializeAttribute('color', args.color),
        serializeAttribute('size', args.size),
        serializeAttribute('margin', args.margin),
        serializeAttribute('marginTop', args.marginTop),
        serializeAttribute('marginRight', args.marginRight),
        serializeAttribute('marginBottom', args.marginBottom),
        serializeAttribute('marginLeft', args.marginLeft),
        serializeAttribute('width', args.width),
        serializeAttribute('alignSelf', args.alignSelf),
        args.startIcon ? ' startIcon={TrashIcon}' : '',
        args.endIcon ? ' endIcon={ChevronRightIcon}' : '',
        args.active ? ' active' : '',
        'disabled' in args && args.disabled ? ' disabled' : '',
        args.onClick ? ' onClick={handleClick}' : '',
    ].join('')

    return renderSource(sourceTemplate, { props })
}
