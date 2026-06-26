import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuSubTriggerClass,
    dropdownMenuSubTriggerChevronClass,
} from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.css.ts'
import { dropdownMenuItemIconClass } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
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
    <RadixDropdownMenu.SubTrigger
        className={cn(dropdownMenuSubTriggerClass, className)}
        {...props}
    >
        {startIcon && (
            <span
                className={dropdownMenuItemIconClass}
                aria-hidden
            >
                <Icon icon={startIcon} size={'xs'} />
            </span>
        )}
        <Typography as={'span'} variant={'span'} style={{ flex: 1 }}>{label}</Typography>
        <span
            className={dropdownMenuSubTriggerChevronClass}
            aria-hidden
        >
            <Icon
                icon={'mdi:chevron-right'}
                size={'xs'}
            />
        </span>
    </RadixDropdownMenu.SubTrigger>
)

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

export default DropdownMenuSubTrigger

