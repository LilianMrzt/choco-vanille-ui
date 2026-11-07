import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { PopoverStoryArgs } from '@stories/overlay/popover/types'
import controlledTemplate from '@stories/overlay/popover/utils/create-popover-source/sources/controlled.source.txt?raw'
import uncontrolledTemplate from '@stories/overlay/popover/utils/create-popover-source/sources/uncontrolled.source.txt?raw'

/**
 * Generates JSX reflecting the current popover controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createPopoverSource('', { args })
 */
export const createPopoverSource = (_source: string, { args }: Readonly<{ args: PopoverStoryArgs }>): string =>
    renderSource(args.open === undefined ? uncontrolledTemplate : controlledTemplate, {
        open: JSON.stringify(args.open ?? args.defaultOpen ?? false),
        modal: JSON.stringify(args.modal ?? false),
        triggerLabel: JSON.stringify(args.triggerLabel),
        contentWidth: JSON.stringify(args.contentWidth),
        contentPadding: JSON.stringify(args.contentPadding ?? 12),
        itemLabel: JSON.stringify(args.itemLabel),
        itemDisabled: JSON.stringify(args.itemDisabled),
        itemDestructive: JSON.stringify(args.itemDestructive),
        itemCloseOnClick: JSON.stringify(args.itemCloseOnClick),
    })
