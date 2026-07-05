import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_SUB_TRIGGER_STYLES } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.css.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
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
    <RadixDropdownMenu.SubTrigger
        asChild
        {...props}
    >
        <Flex
            gap={'sm'}
            className={cn(DROPDOWN_MENU_SUB_TRIGGER_STYLES.root, className)}
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
            <Flex
                as={'span'}
                justifyContent={'center'}
                className={DROPDOWN_MENU_SUB_TRIGGER_STYLES.chevron}
                aria-hidden
            >
                <Icon
                    icon={'mdi:chevron-right'}
                    size={'xs'}
                />
            </Flex>
        </Flex>
    </RadixDropdownMenu.SubTrigger>
)

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

export default DropdownMenuSubTrigger
