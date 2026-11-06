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
import type { CommandProps } from '@components/overlay/command/types'

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
 *         <Command.Item shortcut="⌘E" onSelect={() => {}}>
 *           Edit profile
 *         </Command.Item>
 *         <Command.Item shortcut="⌘S" onSelect={() => {}}>
 *           Settings
 *         </Command.Item>
 *       </Command.Group>
 *       <Command.Separator />
 *       <Command.Group label="Navigation">
 *         <Command.Item onSelect={() => {}}>
 *           Go to dashboard
 *         </Command.Item>
 *       </Command.Group>
 *       <Command.Empty>No results found.</Command.Empty>
 *     </Command.List>
 *   </Command.Content>
 * </Command>
 * ```
 * @param props - Dialog root props, including controlled or uncontrolled open state.
 * @param props.defaultOpen - Initial uncontrolled state; defaults to false.
 * @returns The command palette root.
 */
const CommandRoot = memo<CommandProps>(({ defaultOpen = false, ...props }) => (
    <BaseDialog.Root
        {...props}
        defaultOpen={defaultOpen}
    />
))

CommandRoot.displayName = 'Command'

/** Command palette root with search and action slots. */
const Command = Object.assign(CommandRoot, {
    Trigger: CommandTrigger,
    Content: CommandContent,
    Input: CommandInput,
    List: CommandList,
    Group: CommandGroup,
    Item: CommandItem,
    Empty: CommandEmpty,
    Separator: CommandSeparator,
})

export default Command
