import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { DropdownMenuStoryArgs } from '@stories/overlay/dropdown-menu/types'
import controlled from '@stories/overlay/dropdown-menu/utils/create-dropdown-menu-source/sources/controlled.source.tsx.txt?raw'
import uncontrolled from '@stories/overlay/dropdown-menu/utils/create-dropdown-menu-source/sources/uncontrolled.source.tsx.txt?raw'

/**
 * Generates JSX from the current menu controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createDropdownMenuSource('', { args })
 */
export const createDropdownMenuSource = (_source: string, { args }: Readonly<{ args: DropdownMenuStoryArgs }>): string =>
    renderSource(args.open === undefined ? uncontrolled : controlled, {
        open: JSON.stringify(args.open ?? args.defaultOpen ?? false),
        modal: JSON.stringify(args.modal ?? true),
        triggerLabel: JSON.stringify(args.triggerLabel),
        itemLabel: JSON.stringify(args.itemLabel),
        destructive: JSON.stringify(args.destructive),
        side: JSON.stringify(args.side),
        align: JSON.stringify(args.align),
        checkbox: args.showCheckbox ? '\n        <DropdownMenu.CheckboxItem label="Show details" defaultChecked />' : '',
    })
