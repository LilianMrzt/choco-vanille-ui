import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { cn } from '@utils/cn.ts'
import { SELECT_ITEM_STYLES } from '@components/forms/select/components/select-item/styles/SelectItem.css.ts'
import type { SelectItemProps } from '@components/forms/select/components/select-item/types/SelectItem.props.ts'

/**
  * A single selectable option inside the listbox.
  */
const SelectItem: FC<SelectItemProps> = memo(({
    className,
    label,
    children,
    ...props
}) => (
    <BaseSelect.Item
        className={cn(SELECT_ITEM_STYLES.root, className)}
        {...props}
    >
        <span className={SELECT_ITEM_STYLES.indicator}>
            <BaseSelect.ItemIndicator>
                <Icon
                    icon={IconRegistry.check}
                    size={'xs'}
                />
            </BaseSelect.ItemIndicator>
        </span>
        <BaseSelect.ItemText>{label ?? children}</BaseSelect.ItemText>
    </BaseSelect.Item>
))

SelectItem.displayName = 'Select.Item'

export default SelectItem
