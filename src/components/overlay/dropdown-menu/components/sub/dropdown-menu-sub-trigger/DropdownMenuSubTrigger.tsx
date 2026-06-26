import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuSubTriggerClass,
    dropdownMenuSubTriggerChevronClass,
} from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.css.ts'
import { dropdownMenuItemIconClass } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Icon } from '@components/foundation/icon'
import type { DropdownMenuSubTriggerProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/types/DropdownMenuSubTrigger.props.ts'

/**
 * The item that opens the nested sub-menu on hover/focus.
 * A chevron icon is automatically appended on the right.
 */
const DropdownMenuSubTrigger = ({
    className,
    startIcon,
    children,
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
                {startIcon}
            </span>
        )}
        <span style={{ flex: 1 }}>{children}</span>
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

