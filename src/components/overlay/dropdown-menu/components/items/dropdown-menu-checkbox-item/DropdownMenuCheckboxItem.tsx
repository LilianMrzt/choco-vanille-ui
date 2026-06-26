import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import {checkboxIndicatorClass, checkboxRootClass} from '@components/forms/checkbox/Checkbox.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'
import type {FC} from "react"

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
    className,
    label,
    checked,
    onSelect,
    ...props
}) => (
    <RadixDropdownMenu.CheckboxItem asChild checked={checked} onSelect={(e) => { e.preventDefault(); onSelect?.(e) }} {...props}>
        <Flex gap={'sm'} className={cn(dropdownMenuItemClass, className)}>
            <Box as={'span'} className={checkboxRootClass}>
                <RadixDropdownMenu.ItemIndicator className={checkboxIndicatorClass}>
                    <Icon icon={'mdi:check'} size={'xs'} />
                </RadixDropdownMenu.ItemIndicator>
            </Box>
            <Typography as={'span'} variant={'span'}>{label}</Typography>
        </Flex>
    </RadixDropdownMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export default DropdownMenuCheckboxItem
