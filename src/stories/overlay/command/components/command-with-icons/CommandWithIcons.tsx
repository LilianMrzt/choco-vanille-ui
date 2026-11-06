import { Command } from '@components/overlay/command'
import { Button } from '@components/actions/button'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

/**
 * Renders command item icon variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A command palette.
 * @example
 * <CommandWithIcons />
 */
const CommandWithIcons = () => (
    <Command defaultOpen={false}>
        <Command.Trigger><Button label={'Show icon variants'} /></Command.Trigger>
        <Command.Content>
            <Command.Input placeholder={'Search…'} />
            <Command.List aria-label={'Commands'}>
                <Command.Group label={'Icon variants'}>
                    <Command.Item onSelect={() => {}}>
                        No icon
                    </Command.Item>
                    <Command.Item
                        icon={SearchIcon}
                        onSelect={() => {}}
                    >
                        With icon
                    </Command.Item>
                    <Command.Item
                        icon={SearchIcon}
                        shortcut={'⌘S'}
                        onSelect={() => {}}
                    >
                        Icon and shortcut
                    </Command.Item>
                </Command.Group>
                <Command.Empty>No results found.</Command.Empty>
            </Command.List>
        </Command.Content>
    </Command>
)

export default CommandWithIcons
