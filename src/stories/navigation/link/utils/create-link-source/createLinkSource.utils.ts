import type { LinkProps } from '@components/navigation/link'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/navigation/link/utils/create-link-source/sources/createLinkSource.source.txt?raw'

/**
 * Serializes a string or number as a JSX attribute.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns The attribute or an empty string.
 * @example
 * serializeAttribute('fontSize', 16)
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public link JSX for the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current link props.
 * @returns Consumer JSX reflecting the editable props.
 * @example
 * createLinkSource('', { args: { label: 'Home' } })
 */
export const createLinkSource = (_source: string, { args }: Readonly<{ args: LinkProps }>): string => {
    const attributes = [
        serializeAttribute('href', args.href),
        serializeAttribute('label', args.label),
        serializeAttribute('color', args.color),
        serializeAttribute('fontSize', args.fontSize),
        serializeAttribute('fontWeight', args.fontWeight),
        serializeAttribute('iconSize', args.iconSize),
        serializeAttribute('margin', args.margin),
        serializeAttribute('marginTop', args.marginTop),
        serializeAttribute('marginRight', args.marginRight),
        serializeAttribute('marginBottom', args.marginBottom),
        serializeAttribute('marginLeft', args.marginLeft),
        serializeAttribute('padding', args.padding),
        serializeAttribute('width', args.width),
        serializeAttribute('alignSelf', args.alignSelf),
        serializeAttribute('target', args.target),
        serializeAttribute('rel', args.rel),
        args['aria-disabled'] === undefined ? '' : ` aria-disabled={${JSON.stringify(args['aria-disabled'])}}`,
        args.startIcon ? ' startIcon={ChevronLeftIcon}' : '',
        args.endIcon ? ' endIcon={ChevronRightIcon}' : '',
        args.onClick ? ' onClick={handleClick}' : '',
    ].join('')

    return renderSource(sourceTemplate, { attributes })
}
