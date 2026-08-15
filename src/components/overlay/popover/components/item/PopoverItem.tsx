import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import { POPOVER_ITEM_STYLES } from '@components/overlay/popover/components/item/styles/PopoverItem.css.ts'
import type { PopoverItemProps } from '@components/overlay/popover/components/item/types/PopoverItem.props.ts'

/**
 * A single actionable item inside the popover.
 *
 * It shares the dropdown item presentation while remaining a native button
 * because a popover does not provide a menu context.
 */
const PopoverItem: FC<PopoverItemProps> = memo(({
    className,
    active = false,
    destructive = false,
    startIcon,
    endIcon,
    shortcut,
    label,
    closeOnClick = true,
    disabled,
    onClick,
    ref,
    type = 'button',
    ...props
}) => {
    const itemClassName = cn(
        DROPDOWN_MENU_ITEM_STYLES.root,
        POPOVER_ITEM_STYLES.root,
        destructive && DROPDOWN_MENU_ITEM_STYLES.destructive,
        className,
    )

    const itemContent = (
        <>
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
                maxLines={1}
                width={'100%'}
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
        </>
    )

    const itemProps = {
        ref,
        type,
        className: itemClassName,
        'data-active': active ? 'true' : undefined,
        'data-disabled': disabled ? 'true' : undefined,
        disabled,
        onClick,
        ...props,
    }

    if (closeOnClick && !disabled) {
        return (
            <BasePopover.Close {...itemProps}>
                {itemContent}
            </BasePopover.Close>
        )
    }

    return (
        <button {...itemProps}>
            {itemContent}
        </button>
    )
})

PopoverItem.displayName = 'Popover.Item'

export default PopoverItem
