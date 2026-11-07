import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { EmptyStateStoryArgs } from '@stories/feedback/empty-state/types'
import actionTemplate from '@stories/feedback/empty-state/utils/create-empty-state-source/sources/action.source.txt?raw'
import sourceTemplate from '@stories/feedback/empty-state/utils/create-empty-state-source/sources/createEmptyStateSource.source.txt?raw'

/**
 * Generates consumer JSX for the empty-state demonstration controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current component and demonstration props.
 * @returns Consumer JSX for the displayed state.
 * @example
 * createEmptyStateSource('', { args: { title: 'No results', description: 'Try again.', showAction: false } })
 */
export const createEmptyStateSource = (_source: string, { args }: Readonly<{ args: EmptyStateStoryArgs }>): string => {
    const action = args.showAction
        ? `\n  ${actionTemplate.trim()}`
        : ''
    const className = args.className === undefined ? '' : `\n  className={${JSON.stringify(args.className)}}`
    const buttonImport = args.showAction ? ', Button' : ''

    return renderSource(sourceTemplate, {
        buttonImport,
        title: JSON.stringify(args.title),
        description: JSON.stringify(args.description),
        action,
        className,
    })
}
