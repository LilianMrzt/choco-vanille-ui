import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
    dropdownMenuIndicatorItemClass,
    dropdownMenuItemIndicatorClass,
} from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import { Icon } from '@components/foundation/icon'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'

/**
 * An item that can be toggled on/off like a checkbox.
 * Use `checked` and `onCheckedChange` for controlled behaviour.
 */
const DropdownMenuCheckboxItem = ({
    className,
    children,
    checked,
    ...props
}: DropdownMenuCheckboxItemProps) => (
    <RadixDropdownMenu.CheckboxItem
        className={cn(dropdownMenuItemClass, dropdownMenuIndicatorItemClass, className)}
        checked={checked}
        {...props}
    >
        <RadixDropdownMenu.ItemIndicator className={dropdownMenuItemIndicatorClass}>
            <Icon
                icon={'mdi:check'}
                size={'xs'}
            />
        </RadixDropdownMenu.ItemIndicator>
        {children}
    </RadixDropdownMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export default DropdownMenuCheckboxItem
