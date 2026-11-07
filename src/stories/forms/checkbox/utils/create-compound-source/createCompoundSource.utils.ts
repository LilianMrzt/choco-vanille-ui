import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import template from '@stories/forms/checkbox/utils/create-compound-source/sources/createCompoundSource.source.txt?raw'

/**
 * Produces a consumer example for the current compound controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Original generated source.
 * @param context - Current Storybook context.
 * @param context.args - Current composition and state controls.
 * @returns Controlled consumer source.
 * @example
 * createCompoundSource('', { args })
 */
export const createCompoundSource = (_source: string, { args }: Readonly<{ args: CheckboxStoryArgs }>): string => {
    return renderSource(template, {
        checked: String(Boolean(args.checked)),
        label: JSON.stringify(args.compoundLabel),
        disabled: String(Boolean(args.disabled)),
        indeterminate: String(Boolean(args.indeterminate)),
        required: String(Boolean(args.required)),
        keepMounted: String(args.indicatorKeepMounted),
        indicator: JSON.stringify(args.indicatorText),
    })
}
