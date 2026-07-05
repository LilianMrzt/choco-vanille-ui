import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * Checkmark indicator shown in front of the selected item.
 * Usually provided automatically by `Select.Item`; exposed for advanced
 * composition.
 */
const SelectItemIndicator: FC<RadixSelect.SelectItemIndicatorProps> = (props) => (
    <RadixSelect.ItemIndicator {...props} />
)

SelectItemIndicator.displayName = 'SelectItemIndicator'

export default SelectItemIndicator
