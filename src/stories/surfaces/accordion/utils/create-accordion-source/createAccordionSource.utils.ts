import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/surfaces/accordion/utils/create-accordion-source/sources/playground.source.txt?raw'
import uncontrolledTemplate from '@stories/surfaces/accordion/utils/create-accordion-source/sources/uncontrolled.source.txt?raw'
import type { AccordionStoryArgs } from '@stories/surfaces/accordion/types'

/**
 * Serializes current root and slot controls for every displayed item.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Replaced generated Storybook source.
 * @param context - Current story context.
 * @param context.args - Root and slot controls.
 * @returns The complete consumer composition.
 * @example createAccordionSource('', { args: { value: ['item-1'] } })
 */
export const createAccordionSource = (_source: string, { args }: Readonly<{ args: AccordionStoryArgs }>): string => {
    const names = ['multiple', 'disabled', 'width', 'orientation', 'loopFocus'] as const
    const rootProps = names.map((name) => {
        const value = args[name]
        return value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`
    }).join('')
    const icons = (args.firstStartIcon ? ' startIcon={InfoIcon}' : '') +
        (args.firstEndIcon ? ' endIcon={InfoIcon}' : '')

    const isControlled = args.value !== undefined

    return renderSource(isControlled ? sourceTemplate : uncontrolledTemplate, {
        value: JSON.stringify(isControlled ? args.value : args.defaultValue ?? []),
        rootProps,
        firstDisabled: JSON.stringify(args.firstDisabled ?? false),
        firstLabel: JSON.stringify(args.firstLabel ?? ''),
        icons,
    })
}
