import type { ReactElement } from 'react'
import { Button } from '@components/actions/button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import type { DropdownMenuStoryArgs } from '@stories/overlay/dropdown-menu/types'

/**
 * Renders action, checkbox and submenu slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and demonstration options.
 * @param props.triggerLabel - Label for the menu trigger.
 * @param props.itemLabel - Label for the first action.
 * @param props.destructive - Whether the first action is destructive.
 * @param props.showCheckbox - Whether to display the checkbox item.
 * @param props.side - Preferred side of the trigger for the menu.
 * @param props.align - Alignment of the menu relative to the trigger.
 * @returns A dropdown menu.
 * @example
 * <DropdownMenuExample {...args} />
 */
const DropdownMenuExample = ({ triggerLabel, itemLabel, destructive, showCheckbox, side, align, ...props }: DropdownMenuStoryArgs): ReactElement => (
    <DropdownMenu {...props}>
        <DropdownMenu.Trigger><Button label={triggerLabel} /></DropdownMenu.Trigger>
        <DropdownMenu.Content
            side={side}
            align={align}
        >
            <DropdownMenu.Group>
                <DropdownMenu.Label label={'Actions'} />
                <DropdownMenu.Item
                    label={itemLabel}
                    destructive={destructive}
                />
                <DropdownMenu.Item
                    label={'Unavailable'}
                    disabled
                />
            </DropdownMenu.Group>
            {showCheckbox && (
                <DropdownMenu.CheckboxItem
                    label={'Show details'}
                    defaultChecked
                />
            )}
            <DropdownMenu.Separator />
            <DropdownMenu.RadioGroup defaultValue={'top'}>
                <DropdownMenu.Label label={'Position'} />
                <DropdownMenu.RadioItem
                    label={'Top'}
                    value={'top'}
                />
                <DropdownMenu.RadioItem
                    label={'Bottom'}
                    value={'bottom'}
                />
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Separator />
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger label={'More'} />
                <DropdownMenu.SubContent><DropdownMenu.Item label={'Details'} /></DropdownMenu.SubContent>
            </DropdownMenu.Sub>
        </DropdownMenu.Content>
    </DropdownMenu>
)

export default DropdownMenuExample
