import { Button } from '@components/actions/button'
import { Command } from '@components/overlay/command'
import { SIZES } from '@stories/overlay/command/constants'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <CommandSizes />
 */
const CommandSizes = () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {SIZES.map((size) => (
            <Command
                defaultOpen={false}
                key={size}
            >
                <Command.Trigger>
                    <Button
                        label={size}
                        variant={'outlined'}
                        color={'primary'}
                    />
                </Command.Trigger>
                <Command.Content size={size}>
                    <Command.Input placeholder={'Search…'} />
                    <Command.List aria-label={'Commands'}>
                        <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
                        <Command.Item onSelect={() => {}}>Settings</Command.Item>
                        <Command.Empty>No results found.</Command.Empty>
                    </Command.List>
                </Command.Content>
            </Command>
        ))}
    </div>
)

export default CommandSizes
