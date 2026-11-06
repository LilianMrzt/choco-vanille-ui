import type { FabProps } from '@components/actions/fab'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/actions/fab/utils/create-fab-source/sources/createFabSource.source.tsx.txt?raw'

/**
 * Creates a consumer example from the current Fab controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current Fab props.
 * @returns Consumer JSX using the current controls.
 * @example
 * createFabSource('', { args: { icon: SearchIcon, 'aria-label': 'Search' } })
 */
export const createFabSource = (_source: string, { args }: Readonly<{ args: FabProps }>): string =>
    renderSource(sourceTemplate, {
        label: args.label === undefined ? '' : ` label={${JSON.stringify(args.label)}}`,
        ariaLabel: args['aria-label'] === undefined ? '' : ` aria-label={${JSON.stringify(args['aria-label'])}}`,
        color: args.color === undefined ? '' : ` color={${JSON.stringify(args.color)}}`,
        size: args.size === undefined ? '' : ` size={${JSON.stringify(args.size)}}`,
        position: args.position === undefined ? '' : ` position={${JSON.stringify(args.position)}}`,
        disabled: args.disabled ? ' disabled' : '',
    })
