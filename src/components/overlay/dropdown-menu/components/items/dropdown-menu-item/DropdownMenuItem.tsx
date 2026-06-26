import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import {
    dropdownMenuItemClass,
    dropdownMenuItemDestructiveClass,
    dropdownMenuItemIconClass,
} from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/dropdown-menu-shortcut/DropdownMenuShortcut.tsx'
import type { DropdownMenuItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/types/DropdownMenuItem.props.ts'

/**
 * A single actionable item inside the dropdown.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem
 *     startIcon={<Icon icon={'mdi:pencil'} />}
 *     shortcut={'⌘E'}
 * >
 *     Edit
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuItem = ({
    className,
    destructive = false,
    startIcon,
    endIcon,
    shortcut,
    children,
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
                {startIcon}
            </span>
        )}
        <span style={{ flex: 1 }}>{children}</span>
        {shortcut && (
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
        )}
        {endIcon && (
            <span
                className={dropdownMenuItemIconClass}
                aria-hidden
            >
                {endIcon}
            </span>
        )}
    </RadixDropdownMenu.Item>
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export default DropdownMenuItem


