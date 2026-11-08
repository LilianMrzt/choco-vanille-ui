import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { Command } from '@components/overlay/command'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <CommandControlledOpen />
 */
const CommandControlledOpen = () => {
    const [args, updateArgs] = useArgs<CommandPlaygroundArgs>()
    const open = args.open ?? false
    const setOpen = (nextOpen: boolean) => updateArgs({ open: nextOpen })

    return (
        <>
            <Button
                label={'Toggle command palette (⌘K)'}
                variant={'contained'}
                color={'primary'}
                onClick={() => setOpen(true)}
            />
            <Command
                open={open}
                onOpenChange={(nextOpen, details) => {
                    args.onOpenChange?.(nextOpen, details)
                    if (!details.isCanceled) {
                        setOpen(nextOpen)
                    }
                }}
            >
                <Command.Content>
                    <Command.Input placeholder={'Search…'} />
                    <Command.List aria-label={'Commands'}>
                        <Command.Group label={'Actions'}>
                            <Command.Item
                                icon={SearchIcon}
                                shortcut={'⌘E'}
                                onSelect={() => setOpen(false)}
                            >
                                Edit profile
                            </Command.Item>
                            <Command.Item
                                icon={SearchIcon}
                                shortcut={'⌘S'}
                                onSelect={() => setOpen(false)}
                            >
                                Settings
                            </Command.Item>
                        </Command.Group>
                        <Command.Empty>No results found.</Command.Empty>
                    </Command.List>
                </Command.Content>
            </Command>
        </>
    )
}

export default CommandControlledOpen
