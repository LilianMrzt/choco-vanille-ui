import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ContextMenuStoryArgs } from '@stories/overlay/context-menu/types'
import controlled from '@stories/overlay/context-menu/utils/create-context-menu-source/sources/controlled.source.txt?raw'
import uncontrolled from '@stories/overlay/context-menu/utils/create-context-menu-source/sources/uncontrolled.source.txt?raw'
import disabledItemSource from '@stories/overlay/context-menu/utils/create-context-menu-source/sources/disabled-item.source.txt?raw'

/**
 * Generates JSX from the current controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createContextMenuSource('', { args })
 */
export const createContextMenuSource = (_source: string, { args }: Readonly<{ args: ContextMenuStoryArgs }>): string =>
    renderSource(args.open === undefined ? uncontrolled : controlled, {
        open: JSON.stringify(args.open ?? args.defaultOpen ?? false),
        disabled: JSON.stringify(Boolean(args.disabled)),
        loopFocus: JSON.stringify(args.loopFocus ?? true),
        highlightItemOnHover: JSON.stringify(args.highlightItemOnHover ?? true),
        triggerLabel: JSON.stringify(args.triggerLabel),
        editLabel: JSON.stringify(args.editLabel),
        deleteLabel: JSON.stringify(args.deleteLabel),
        disabledItem: args.showDisabledItem ? disabledItemSource.trimEnd() : '',
    })
