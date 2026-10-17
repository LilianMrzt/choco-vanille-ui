import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { RADIO_ITEM_STYLES } from '@components/forms/radio-group/components/radio-item/styles/RadioItem.css.ts'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuRadioItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/types/DropdownMenuRadioItem.props.ts'

const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = memo(({
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
                <span className={RADIO_ITEM_STYLES.dot} />
            </BaseMenu.RadioItemIndicator>
        </Box>
        <Typography
            as={'span'}
            variant={'span'}
            maxLines={1}
            width={'100%'}
        >
            {label}
        </Typography>
    </BaseMenu.RadioItem>
))

DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem'

export default DropdownMenuRadioItem
