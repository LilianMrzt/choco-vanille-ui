import type { PaginationProps } from '@components/navigation/pagination'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/navigation/pagination/utils/create-pagination-source/sources/createPaginationSource.source.txt?raw'

/**
 * Serializes a string or number JSX attribute when present.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Attribute value.
 * @returns The JSX attribute or an empty string.
 * @example
 * serializeAttribute('totalPages', 10)
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public pagination JSX for the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current pagination props.
 * @returns Consumer JSX for the displayed navigator.
 * @example
 * createPaginationSource('', { args })
 */
export const createPaginationSource = (_source: string, { args }: Readonly<{ args: PaginationProps }>): string => {
    const attributes = [
        serializeAttribute('aria-label', args['aria-label']),
        serializeAttribute('totalPages', args.totalPages),
        serializeAttribute('siblingCount', args.siblingCount),
        serializeAttribute('boundaryCount', args.boundaryCount),
        serializeAttribute('previousLabel', args.previousLabel),
        serializeAttribute('nextLabel', args.nextLabel),
    ].join('')

    return renderSource(sourceTemplate, { currentPage: JSON.stringify(args.currentPage), attributes })
}
