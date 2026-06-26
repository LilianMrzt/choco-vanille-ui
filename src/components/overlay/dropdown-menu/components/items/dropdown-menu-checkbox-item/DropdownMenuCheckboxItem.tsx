import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import {checkboxIndicatorClass, checkboxRootClass} from '@components/forms/checkbox/Checkbox.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'
import type {FC} from "react";

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
    className,
    label,
    checked,
    onSelect,
    ...props
}) => (
        <RadixDropdownMenu.CheckboxItem
        className={cn(dropdownMenuItemClass, className)}
        checked={checked}
        onSelect={(e) => {
            e.preventDefault()
            onSelect?.(e)
        }}
        {...props}
    >
            <span className={checkboxRootClass}>
                <RadixDropdownMenu.ItemIndicator className={checkboxIndicatorClass}>
                    <Icon
                        icon={'mdi:check'}
                        size={'xs'}
                    />
                </RadixDropdownMenu.ItemIndicator>
            </span>
        <Typography as={'span'} variant={'span'}>{label}</Typography>
    </RadixDropdownMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export default DropdownMenuCheckboxItem
