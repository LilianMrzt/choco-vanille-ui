import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'
import type { FC } from 'react'

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
    className,
    label,
    checked,
    onSelect,
    ...props
}) => (
    <RadixDropdownMenu.CheckboxItem
        asChild
        checked={checked}
        onSelect={(e) => { e.preventDefault(); onSelect?.(e) }}
        {...props}
    >
        <Flex
            gap={'sm'}
            className={cn(DROPDOWN_MENU_ITEM_STYLES.root, className)}
        >
            <Box
                as={'span'}
                className={CHECKBOX_STYLES.root}
            >
                <RadixDropdownMenu.ItemIndicator className={CHECKBOX_STYLES.indicator}>
                    <Icon
                        icon={'mdi:check'}
                        size={'xs'}
                    />
                </RadixDropdownMenu.ItemIndicator>
            </Box>
            <Typography
                as={'span'}
                variant={'span'}
            >{label}</Typography>
        </Flex>
    </RadixDropdownMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

export default DropdownMenuCheckboxItem
