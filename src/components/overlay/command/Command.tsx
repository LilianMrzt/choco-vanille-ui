import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo } from 'react'

import {
    CommandContent,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandTrigger,
} from '@components/overlay/command/components'
import type { CommandCompound } from '@components/overlay/command/types'
import type { CommandProps } from '@components/overlay/command/types/Command.props.ts'

/**
 * A modal command palette for action search and keyboard navigation.
 *
 * Built on Base UI Dialog for focus-trap, backdrop, Escape-key dismiss and
 * portal rendering. Compose with the named sub-components:
 *
 * - `Command.Trigger` — element that opens the palette.
 * - `Command.Content` — the modal panel; creates the search context.
 * - `Command.Input` — the combobox search field.
 * - `Command.List` — the scrollable results container (`role="listbox"`).
 * - `Command.Group` — a labeled section inside the list.
 * - `Command.Item` — a single activatable command (`role="option"`).
 * - `Command.Empty` — shown when no items match the current search.
 * - `Command.Separator` — horizontal divider between groups.
 *
 * @example
 * ```tsx
 * <Command>
 *   <Command.Trigger>
 *     <Button label="Open command palette" variant="outlined" color="primary" />
 *   </Command.Trigger>
 *   <Command.Content>
 *     <Command.Input placeholder="Search actions…" />
 *     <Command.List aria-label="Commands">
 *       <Command.Group label="Actions">
 *         <Command.Item icon="lucide:pencil" shortcut="⌘E" onSelect={() => {}}>
 *           Edit profile
 *         </Command.Item>
 *         <Command.Item icon="lucide:settings" shortcut="⌘S" onSelect={() => {}}>
 *           Settings
 *         </Command.Item>
 *       </Command.Group>
 *       <Command.Separator />
 *       <Command.Group label="Navigation">
 *         <Command.Item icon="lucide:home" onSelect={() => {}}>
 *           Go to dashboard
 *         </Command.Item>
 *       </Command.Group>
 *       <Command.Empty>No results found.</Command.Empty>
 *     </Command.List>
 *   </Command.Content>
 * </Command>
 * ```
 */
const Command = memo<CommandProps>(({ defaultOpen = false, ...props }) => (
    <BaseDialog.Root
        {...props}
        defaultOpen={defaultOpen}
    />
)) as unknown as CommandCompound

Command.displayName = 'Command'
Command.Trigger = CommandTrigger
Command.Content = CommandContent
Command.Input = CommandInput
Command.List = CommandList
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Empty = CommandEmpty
Command.Separator = CommandSeparator

export { Command }
