import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Checkmark indicator shown in front of the selected item.
 * Usually provided automatically by `Select.Item`; exposed for advanced
 * composition.
 */
const SelectItemIndicator: FC<BaseSelect.ItemIndicator.Props> = (props) => (
    <BaseSelect.ItemIndicator {...props} />
)

SelectItemIndicator.displayName = 'Select.ItemIndicator'

export default SelectItemIndicator
