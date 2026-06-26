import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
    dropdownMenuItemDestructiveClass,
    dropdownMenuItemIconClass,
} from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/dropdown-menu-shortcut/DropdownMenuShortcut.tsx'
import type { DropdownMenuItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/types/DropdownMenuItem.props.ts'

/**
 * A single actionable item inside the dropdown.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem
 *     label={'Edit'}
 *     startIcon={'mdi:pencil'}
 *     shortcut={'⌘E'}
 * />
 * ```
 */
const DropdownMenuItem = ({
    className,
    destructive = false,
    startIcon,
    endIcon,
    shortcut,
    label,
    ...props
}: DropdownMenuItemProps) => (
    <RadixDropdownMenu.Item
        className={cn(
            dropdownMenuItemClass,
            destructive && dropdownMenuItemDestructiveClass,
            className,
        )}
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
        {shortcut && (
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
        )}
        {endIcon && (
            <span
                className={dropdownMenuItemIconClass}
                aria-hidden
            >
                <Icon icon={endIcon} size={'xs'} />
            </span>
        )}
    </RadixDropdownMenu.Item>
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export default DropdownMenuItem

