import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
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
        asChild
        {...props}
    >
        <Flex
            gap={'sm'}
            className={cn(
                DROPDOWN_MENU_ITEM_STYLES.root,
                destructive && DROPDOWN_MENU_ITEM_STYLES.destructive,
                className,
            )}
        >
            {startIcon && (
                <Flex
                    as={'span'}
                    justifyContent={'center'}
                    className={DROPDOWN_MENU_ITEM_STYLES.icon}
                    aria-hidden
                >
                    <Icon
                        icon={startIcon}
                        size={'xs'}
                    />
                </Flex>
            )}
            <Typography
                as={'span'}
                variant={'span'}
                style={{ flex: 1 }}
            >{label}</Typography>
            {shortcut && (
                <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
            )}
            {endIcon && (
                <Flex
                    as={'span'}
                    justifyContent={'center'}
                    className={DROPDOWN_MENU_ITEM_STYLES.icon}
                    aria-hidden
                >
                    <Icon
                        icon={endIcon}
                        size={'xs'}
                    />
                </Flex>
            )}
        </Flex>
    </RadixDropdownMenu.Item>
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export default DropdownMenuItem
