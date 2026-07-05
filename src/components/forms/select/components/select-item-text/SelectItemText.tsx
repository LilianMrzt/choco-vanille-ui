import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * Text label of an item. Exposed for advanced composition.
 */
const SelectItemText: FC<RadixSelect.SelectItemTextProps> = (props) => (
    <RadixSelect.ItemText {...props} />
)

SelectItemText.displayName = 'SelectItemText'

export default SelectItemText
