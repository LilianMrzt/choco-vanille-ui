import { CHECK_ICON as CheckIcon } from '@constants/icon-registry'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, useCallback, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'
import { Box } from '@components/layout/box'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuCheckboxItemProps } from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/types'

const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = memo(({
    className,
    label,
    checked,
    onCheckedChange,
    ...props
}) => {
    const handleCheckedChange = useCallback(
        (value: boolean, eventDetails: BaseMenu.CheckboxItem.ChangeEventDetails) =>
            onCheckedChange?.(value, eventDetails),
        [onCheckedChange],
    )

    return (
        <BaseMenu.CheckboxItem
            className={cn(DROPDOWN_MENU_ITEM_STYLES.root, className)}
            checked={checked}
            onCheckedChange={handleCheckedChange}
            {...props}
        >
            <Box
                as={'span'}
                className={CHECKBOX_STYLES.root}
            >
                <BaseMenu.CheckboxItemIndicator className={CHECKBOX_STYLES.indicator}>
                    <Icon
                        icon={CheckIcon}
                        size={12}
                    />
                </BaseMenu.CheckboxItemIndicator>
            </Box>
            <Typography
                as={'span'}
                variant={'span'}
                maxLines={1}
                width={'100%'}
            >
                {label}
            </Typography>
        </BaseMenu.CheckboxItem>
    )
})

DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem'

export default DropdownMenuCheckboxItem
