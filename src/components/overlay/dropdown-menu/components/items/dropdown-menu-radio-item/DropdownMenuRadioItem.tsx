import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
    dropdownMenuIndicatorItemClass,
    dropdownMenuItemIndicatorClass,
} from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import { Icon } from '@components/foundation/icon'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'

/**
 * A radio item inside a `DropdownMenuRadioGroup`.
 * Use the `value` prop to identify the selected item.
 */
const DropdownMenuRadioItem = ({
    className,
    children,
    ...props
}: DropdownMenuRadioItemProps) => (
    <RadixDropdownMenu.RadioItem
        className={cn(dropdownMenuItemClass, dropdownMenuIndicatorItemClass, className)}
        {...props}
    >
        <RadixDropdownMenu.ItemIndicator className={dropdownMenuItemIndicatorClass}>
            <Icon
                icon={'mdi:circle'}
                size={'xs'}
            />
        </RadixDropdownMenu.ItemIndicator>
        {children}
    </RadixDropdownMenu.RadioItem>
)

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

export default DropdownMenuRadioItem
