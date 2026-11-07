import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { BreadcrumbsStoryArgs } from '@stories/navigation/breadcrumbs/types'
import sourceTemplate from '@stories/navigation/breadcrumbs/utils/create-breadcrumbs-source/sources/createBreadcrumbsSource.source.txt?raw'

/**
 * Generates breadcrumb JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createBreadcrumbsSource('', { args })
 */
export const createBreadcrumbsSource = (_source: string, { args }: Readonly<{ args: BreadcrumbsStoryArgs }>): string => {
    const color = args.color === undefined ? '' : ` color={${JSON.stringify(args.color)}}`
    const separator = args.separator === undefined ? '' : ` separator={${JSON.stringify(args.separator)}}`

    return renderSource(sourceTemplate, {
        label: JSON.stringify(args['aria-label']),
        color,
        separator,
        currentLabel: JSON.stringify(args.currentLabel),
    })
}
