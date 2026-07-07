import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { RADIO_ITEM_STYLES } from '@components/forms/radio-group/components/radio-item/styles/RadioItem.css.ts'
import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'
import type { FC } from 'react'

const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
    className,
    label,
    ...props
}) => (
    <BaseMenu.RadioItem
        className={cn(DROPDOWN_MENU_ITEM_STYLES.root, className)}
        {...props}
    >
        <Box
            as={'span'}
            className={RADIO_ITEM_STYLES.root}
        >
            <BaseMenu.RadioItemIndicator
                className={RADIO_ITEM_STYLES.indicator}
            >
                <Icon
                    icon={IconRegistry.radioIndicator}
                    size={'xs'}
                />
            </BaseMenu.RadioItemIndicator>
        </Box>
        <Typography
            as={'span'}
            variant={'span'}
        >
            {label}
        </Typography>
    </BaseMenu.RadioItem>
)

DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem'

export default DropdownMenuRadioItem
