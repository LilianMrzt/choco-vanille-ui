import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { SELECT_SEPARATOR_STYLES } from '@components/forms/select/components/select-separator/SelectSeparator.css.ts'

/**
 * Horizontal divider between groups of items.
 */
const SelectSeparator: FC<BaseSelect.Separator.Props> = ({ className, ...props }) => (
    <BaseSelect.Separator
        className={cn(SELECT_SEPARATOR_STYLES.root, className)}
        {...props}
    />
)

SelectSeparator.displayName = 'SelectSeparator'

export default SelectSeparator
