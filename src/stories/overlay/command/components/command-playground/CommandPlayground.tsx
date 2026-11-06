import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { Command } from '@components/overlay/command'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <CommandPlayground />
 */
const CommandPlayground = () => {
    const [args, updateArgs] = useArgs<CommandPlaygroundArgs>()
    const {
        modal,
        size,
        inputPlaceholder,
        inputClearAriaLabel,
        showGroup1,
        showGroup2,
        showIcons,
        showShortcuts,
    } = args
    return (
        <Command
            open={args.open}
            onOpenChange={(open, details) => {
                args.onOpenChange?.(open, details)
                if (!details.isCanceled) {
                    updateArgs({ open })
                }
            }}
            modal={modal}
        >
            <Command.Trigger>
                <Button
                    label={'Open command palette'}
                    variant={'outlined'}
                    color={'primary'}
                />
            </Command.Trigger>
            <Command.Content size={size}>
                <Command.Input
                    placeholder={inputPlaceholder}
                    defaultClearAriaLabel={inputClearAriaLabel}
                />
                <Command.List aria-label={'Commands'}>
                    {showGroup1 && (
                        <Command.Group label={'Actions'}>
                            <Command.Item
                                icon={showIcons ? SearchIcon : undefined}
                                shortcut={showShortcuts ? '⌘E' : undefined}
                                onSelect={() => {}}
                            >
                                Edit profile
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? SearchIcon : undefined}
                                shortcut={showShortcuts ? '⌘S' : undefined}
                                onSelect={() => {}}
                            >
                                Settings
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? TrashIcon : undefined}
                                disabled
                            >
                                Delete account
                            </Command.Item>
                        </Command.Group>
                    )}
                    {showGroup1 && showGroup2 && <Command.Separator />}
                    {showGroup2 && (
                        <Command.Group label={'Navigation'}>
                            <Command.Item
                                icon={showIcons ? UserIcon : undefined}
                                shortcut={showShortcuts ? '⌘H' : undefined}
                                onSelect={() => {}}
                            >
                                Go to dashboard
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? UserIcon : undefined}
                                shortcut={showShortcuts ? '⌘P' : undefined}
                                onSelect={() => {}}
                            >
                                My profile
                            </Command.Item>
                        </Command.Group>
                    )}
                    <Command.Empty>No results found.</Command.Empty>
                </Command.List>
            </Command.Content>
        </Command>
    )
}

export default CommandPlayground
