import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

/**
 * Scrollable list of items inside the popup.
 */
const SelectList: FC<BaseSelect.List.Props> = memo((props) => (
    <BaseSelect.List {...props} />
))

SelectList.displayName = 'Select.List'

export default SelectList
