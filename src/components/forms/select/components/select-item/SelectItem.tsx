import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { cn } from '@utils/cn.ts'
import { SELECT_ITEM_STYLES } from '@components/forms/select/components/select-item/SelectItem.css.ts'
import type { SelectItemProps } from '@components/forms/select/components/select-item/types/SelectItem.props.ts'

/**
 * A single selectable option inside the listbox.
 */
const SelectItem: FC<SelectItemProps> = ({ className, label, children, ...props }) => (
    <RadixSelect.Item
        className={cn(SELECT_ITEM_STYLES.root, className)}
        {...props}
    >
        <span className={SELECT_ITEM_STYLES.indicator}>
            <RadixSelect.ItemIndicator asChild>
                <Icon
                    icon={'mdi:check'}
                    size={'xs'}
                />
            </RadixSelect.ItemIndicator>
        </span>
        <RadixSelect.ItemText>{label ?? children}</RadixSelect.ItemText>
    </RadixSelect.Item>
)

SelectItem.displayName = 'SelectItem'

export default SelectItem
