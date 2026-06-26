import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import {
    dropdownMenuRadioCircleClass,
} from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'

/**
 * A radio item inside a `DropdownMenuRadioGroup`.
 * Use the `value` prop to identify the selected item.
 * The menu stays open after interaction.
 */
const DropdownMenuRadioItem = ({
    className,
    label,
    onSelect,
    ...props
}: DropdownMenuRadioItemProps) => (
    <RadixDropdownMenu.RadioItem
        className={cn(dropdownMenuItemClass, className)}
        onSelect={(e) => {
            e.preventDefault()
            onSelect?.(e)
        }}
        {...props}
    >
        <span className={dropdownMenuRadioCircleClass}>
            <RadixDropdownMenu.ItemIndicator>
                <Icon
                    icon={'mdi:circle'}
                    size={'xs'}
                />
            </RadixDropdownMenu.ItemIndicator>
        </span>
        <Typography as={'span'} variant={'span'}>{label}</Typography>
    </RadixDropdownMenu.RadioItem>
)

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

export default DropdownMenuRadioItem
