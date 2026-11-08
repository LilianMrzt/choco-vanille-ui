import { SEARCH_ICON as SearchIcon, TRASH_ICON as TrashIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { Command } from '@components/overlay/command'
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
        contentLabel,
        inputLabel,
        firstItemDisabled,
        firstItemKeywords,
        actionsLabel,
        navigationLabel,
        emptyLabel,
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
            <Command.Content
                defaultAriaLabel={contentLabel}
                size={size}
            >
                <Command.Input
                    placeholder={inputPlaceholder}
                    defaultClearAriaLabel={inputClearAriaLabel}
                    defaultAriaLabel={inputLabel}
                />
                <Command.List aria-label={'Commands'}>
                    {showGroup1 && (
                        <Command.Group label={actionsLabel}>
                            <Command.Item
                                icon={showIcons ? SearchIcon : undefined}
                                shortcut={showShortcuts ? '⌘E' : undefined}
                                onSelect={() => {}}
                                disabled={firstItemDisabled}
                                keywords={firstItemKeywords}
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
                        <Command.Group label={navigationLabel}>
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
                    <Command.Empty>{emptyLabel}</Command.Empty>
                </Command.List>
            </Command.Content>
        </Command>
    )
}

export default CommandPlayground
