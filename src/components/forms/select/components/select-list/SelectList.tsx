import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Scrollable list of items inside the popup.
 */
const SelectList: FC<BaseSelect.List.Props> = (props) => (
    <BaseSelect.List {...props} />
)

SelectList.displayName = 'Select.List'

export default SelectList
