import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import {
    radioIndicatorClass,
    radioItemRootClass
} from '@components/forms/radio-group/components/radio-item/RadioItem.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'
import type { FC } from "react";

const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
    className,
    label,
    onSelect,
    ...props
}) => (
        <RadixDropdownMenu.RadioItem
        className={cn(dropdownMenuItemClass, className)}
        onSelect={(e) => {
            e.preventDefault()
            onSelect?.(e)
        }}
        {...props}
    >
            <span className={radioItemRootClass}>
                <RadixDropdownMenu.ItemIndicator className={radioIndicatorClass}>
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
