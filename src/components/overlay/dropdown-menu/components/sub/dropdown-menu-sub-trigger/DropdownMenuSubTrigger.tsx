import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuSubTriggerClass,
    dropdownMenuSubTriggerChevronClass,
} from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.css.ts'
import { dropdownMenuItemIconClass } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuSubTriggerProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/types/DropdownMenuSubTrigger.props.ts'

/**
 * The item that opens the nested sub-menu on hover/focus.
 * A chevron icon is automatically appended on the right.
 */
const DropdownMenuSubTrigger = ({
    className,
    startIcon,
    label,
    ...props
}: DropdownMenuSubTriggerProps) => (
    <RadixDropdownMenu.SubTrigger asChild {...props}>
        <Flex gap={'sm'} className={cn(dropdownMenuSubTriggerClass, className)}>
            {startIcon && (
                <Flex as={'span'} justify={'center'} className={dropdownMenuItemIconClass} aria-hidden>
                    <Icon icon={startIcon} size={'xs'} />
                </Flex>
            )}
            <Typography as={'span'} variant={'span'} style={{ flex: 1 }}>{label}</Typography>
            <Flex as={'span'} justify={'center'} className={dropdownMenuSubTriggerChevronClass} aria-hidden>
                <Icon icon={'mdi:chevron-right'} size={'xs'} />
            </Flex>
        </Flex>
    </RadixDropdownMenu.SubTrigger>
)

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

export default DropdownMenuSubTrigger

