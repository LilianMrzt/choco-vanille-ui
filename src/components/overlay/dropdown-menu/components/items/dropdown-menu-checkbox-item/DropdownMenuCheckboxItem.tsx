import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import {
    dropdownMenuCheckboxBoxClass,
} from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.css.ts'
import { Icon } from '@components/foundation/icon'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'

/**
 * An item that can be toggled on/off like a checkbox.
 * Use `checked` and `onCheckedChange` for controlled behaviour.
 * The menu stays open after interaction.
 */
const DropdownMenuCheckboxItem = ({
    className,
    children,
    checked,
    onSelect,
    ...props
}: DropdownMenuCheckboxItemProps) => (
    <RadixDropdownMenu.CheckboxItem
        className={cn(dropdownMenuItemClass, className)}
        checked={checked}
        onSelect={(e) => {
            e.preventDefault()
            onSelect?.(e)
        }}
        {...props}
    >
        <span className={dropdownMenuCheckboxBoxClass}>
            <RadixDropdownMenu.ItemIndicator>
                <Icon
                    icon={'mdi:check'}
                    size={'xs'}
                />
            </RadixDropdownMenu.ItemIndicator>
        </span>
        {children}
    </RadixDropdownMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export default DropdownMenuCheckboxItem
