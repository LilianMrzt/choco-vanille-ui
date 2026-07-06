import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types/DropdownMenuCheckboxItem.props.ts'
import type { FC } from 'react'

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
    className,
    label,
    checked,
    onCheckedChange,
    ...props
}) => (
    <BaseMenu.CheckboxItem
        className={cn(DROPDOWN_MENU_ITEM_STYLES.root, className)}
        checked={checked}
        onCheckedChange={(value, eventDetails) => onCheckedChange?.(value, eventDetails)}
        {...props}
    >
        <Box
            as={'span'}
            className={CHECKBOX_STYLES.root}
        >
            <BaseMenu.CheckboxItemIndicator className={CHECKBOX_STYLES.indicator}>
                <Icon
                    icon={IconRegistry.check}
                    size={'xs'}
                />
            </BaseMenu.CheckboxItemIndicator>
        </Box>
        <Typography
            as={'span'}
            variant={'span'}
        >
            {label}
        </Typography>
    </BaseMenu.CheckboxItem>
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem'

export default DropdownMenuCheckboxItem