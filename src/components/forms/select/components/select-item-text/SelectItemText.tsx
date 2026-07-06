import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Text label of an item. Exposed for advanced composition.
 */
const SelectItemText: FC<BaseSelect.ItemText.Props> = (props) => (
    <BaseSelect.ItemText {...props} />
)

SelectItemText.displayName = 'SelectItemText'

export default SelectItemText
