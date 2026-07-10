import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_SUB_TRIGGER_STYLES } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/styles/DropdownMenuSubTrigger.css.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuSubTriggerProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/types/DropdownMenuSubTrigger.props.ts'

/**
  * The item that opens the nested sub-menu on hover/focus.
  * A chevron icon is automatically appended on the right.
  */
const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = memo(({
    className,
    startIcon,
    label,
    ...props
}) => (
    <BaseMenu.SubmenuTrigger
        className={cn(DROPDOWN_MENU_SUB_TRIGGER_STYLES.root, className)}
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
        <Flex
            as={'span'}
            justifyContent={'center'}
            className={DROPDOWN_MENU_SUB_TRIGGER_STYLES.chevron}
            aria-hidden
        >
            <Icon
                icon={IconRegistry.chevronRight}
                size={'xs'}
            />
        </Flex>
    </BaseMenu.SubmenuTrigger>
))

DropdownMenuSubTrigger.displayName = 'DropdownMenu.SubTrigger'

export default DropdownMenuSubTrigger
