import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'
import template from '@stories/overlay/command/utils/create-controlled-command-source/sources/controlled.source.tsx.txt?raw'

/**
 * Renders the controlled command example with the current open state.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story arguments.
 * @returns Consumer JSX.
 * @example
 * createControlledCommandSource('', { args })
 */
export const createControlledCommandSource = (_source: string, { args }: Readonly<{ args: CommandPlaygroundArgs }>): string =>
    renderSource(template, { open: JSON.stringify(args.open ?? false) })
