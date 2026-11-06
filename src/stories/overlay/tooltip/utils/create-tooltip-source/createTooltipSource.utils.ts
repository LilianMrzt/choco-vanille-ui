import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { TooltipStoryArgs } from '@stories/overlay/tooltip/constants'
import controlledTemplate from '@stories/overlay/tooltip/utils/create-tooltip-source/sources/controlled.source.tsx.txt?raw'
import uncontrolledTemplate from '@stories/overlay/tooltip/utils/create-tooltip-source/sources/uncontrolled.source.tsx.txt?raw'

/**
 * Generates JSX reflecting the current tooltip controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createTooltipSource('', { args })
 */
export const createTooltipSource = (_source: string, { args }: Readonly<{ args: TooltipStoryArgs }>): string => {
    const attributes = Object.entries({
        content: args.content,
        position: args.position,
        side: args.side,
        align: args.align,
        delayDuration: args.delayDuration,
        disabled: args.disabled,
        openOnFocus: args.openOnFocus,
        arrow: args.arrow,
        closeOnClick: args.closeOnClick,
    }).filter(([, value]) => value !== undefined)
        .map(([name, value]) => ` ${name}={${JSON.stringify(value)}}`)
        .join('')

    return renderSource(args.open === undefined ? uncontrolledTemplate : controlledTemplate, {
        open: JSON.stringify(args.open ?? args.defaultOpen ?? false),
        attributes,
        triggerLabel: JSON.stringify(args.triggerLabel),
    })
}
