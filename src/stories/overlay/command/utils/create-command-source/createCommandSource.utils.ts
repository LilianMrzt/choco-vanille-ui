import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'
import template from '@stories/overlay/command/utils/create-command-source/sources/playground.source.tsx.txt?raw'
import actions from '@stories/overlay/command/utils/create-command-source/sources/actions.source.tsx.txt?raw'
import navigation from '@stories/overlay/command/utils/create-command-source/sources/navigation.source.tsx.txt?raw'

/**
 * Produces a consumer example reflecting the command palette controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createCommandSource('', { args })
 */
export const createCommandSource = (_source: string, { args }: Readonly<{ args: CommandPlaygroundArgs }>): string => {
    const itemProps = {
        searchIcon: args.showIcons ? ' icon={SearchIcon}' : '',
        trashIcon: args.showIcons ? ' icon={TrashIcon}' : '',
        userIcon: args.showIcons ? ' icon={UserIcon}' : '',
        editShortcut: args.showShortcuts ? ' shortcut="⌘E"' : '',
        settingsShortcut: args.showShortcuts ? ' shortcut="⌘S"' : '',
        dashboardShortcut: args.showShortcuts ? ' shortcut="⌘H"' : '',
        profileShortcut: args.showShortcuts ? ' shortcut="⌘P"' : '',
    }

    return renderSource(template, {
        open: JSON.stringify(args.open ?? false),
        modal: JSON.stringify(args.modal ?? true),
        size: JSON.stringify(args.size ?? 'md'),
        placeholder: JSON.stringify(args.inputPlaceholder ?? ''),
        clearLabel: JSON.stringify(args.inputClearAriaLabel ?? 'Clear search'),
        actions: args.showGroup1 ? renderSource(actions, itemProps) : '',
        separator: args.showGroup1 && args.showGroup2 ? '\n        <Command.Separator />' : '',
        navigation: args.showGroup2 ? renderSource(navigation, itemProps) : '',
    })
}
