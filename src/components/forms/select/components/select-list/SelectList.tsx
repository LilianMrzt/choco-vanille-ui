import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { SELECT_LIST_STYLES } from '@components/forms/select/components/select-list/styles/SelectList.css.ts'

/**
 * Scrollable list of items inside the popup.
 */
const SelectList: FC<BaseSelect.List.Props> = memo(({ className, ...props }) => (
    <BaseSelect.List
        className={cn(SELECT_LIST_STYLES.list, className)}
        {...props}
    />
))

SelectList.displayName = 'Select.List'

export default SelectList
