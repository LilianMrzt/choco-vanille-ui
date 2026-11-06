import { Command } from '@components/overlay/command'
import { Button } from '@components/actions/button'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'

/**
 * Renders command item states.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A command palette.
 * @example
 * <CommandStates />
 */
const CommandStates = () => (
    <Command defaultOpen={false}>
        <Command.Trigger><Button label={'Show item states'} /></Command.Trigger>
        <Command.Content>
            <Command.Input placeholder={'Search…'} />
            <Command.List aria-label={'Commands'}>
                <Command.Group label={'States'}>
                    <Command.Item
                        icon={SearchIcon}
                        onSelect={() => {}}
                    >
                        Default item
                    </Command.Item>
                    <Command.Item
                        icon={SearchIcon}
                        onSelect={() => {}}
                    >
                        Another item
                    </Command.Item>
                    <Command.Item
                        icon={TrashIcon}
                        disabled
                    >
                        Disabled item
                    </Command.Item>
                </Command.Group>
                <Command.Empty>No results found.</Command.Empty>
            </Command.List>
        </Command.Content>
    </Command>
)

export default CommandStates
