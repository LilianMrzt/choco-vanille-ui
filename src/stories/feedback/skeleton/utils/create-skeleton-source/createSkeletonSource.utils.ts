import type { SkeletonProps } from '@components/feedback/skeleton'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/feedback/skeleton/utils/create-skeleton-source/sources/createSkeletonSource.source.txt?raw'

/**
 * Serializes a present string or numeric JSX attribute.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns A JSX attribute or an empty string.
 * @example
 * serializeAttribute('width', '12rem')
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates consumer JSX for the current skeleton controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current skeleton props.
 * @returns Consumer JSX reflecting the editable controls.
 * @example
 * createSkeletonSource('', { args: { width: '12rem' } })
 */
export const createSkeletonSource = (_source: string, { args }: Readonly<{ args: SkeletonProps }>): string => {
    const attributes = [
        serializeAttribute('variant', args.variant),
        serializeAttribute('width', args.width),
        serializeAttribute('height', args.height),
        serializeAttribute('className', args.className),
    ].join('')

    return renderSource(sourceTemplate, { attributes })
}
