import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { RADIO_ITEM_STYLES } from '@components/forms/radio-group/components/radio-item/RadioItem.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'
import type { FC } from 'react'

const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
    className,
    label,
    onSelect,
    ...props
}) => (
    <RadixDropdownMenu.RadioItem
        asChild
        onSelect={(e) => { e.preventDefault(); onSelect?.(e) }}
        {...props}
    >
        <Flex
            gap={'sm'}
            className={cn(DROPDOWN_MENU_ITEM_STYLES.root, className)}
        >
            <Box
                as={'span'}
                className={RADIO_ITEM_STYLES.root}
            >
                <RadixDropdownMenu.ItemIndicator className={RADIO_ITEM_STYLES.indicator}>
                    <Icon
                        icon={'mdi:circle'}
                        size={'xs'}
                    />
                </RadixDropdownMenu.ItemIndicator>
            </Box>
            <Typography
                as={'span'}
                variant={'span'}
            >{label}</Typography>
        </Flex>
    </RadixDropdownMenu.RadioItem>
)

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

export default DropdownMenuRadioItem
