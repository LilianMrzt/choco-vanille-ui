import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

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
  *     startIcon={'lucide:pencil'}
  *     shortcut={'⌘E'}
  * />
  * ```
  */
const DropdownMenuItem: FC<DropdownMenuItemProps> = memo(({
    className,
    destructive = false,
    startIcon,
    endIcon,
    shortcut,
    label,
    ...props
}) => (
    <BaseMenu.Item
        className={cn(
            DROPDOWN_MENU_ITEM_STYLES.root,
            destructive && DROPDOWN_MENU_ITEM_STYLES.destructive,
            className,
        )}
        {...props}
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
        >
            {label}
        </Typography>
        {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
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
    </BaseMenu.Item>
))

DropdownMenuItem.displayName = 'DropdownMenu.Item'

export default DropdownMenuItem