import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Scrollable list of items inside the popup.
 */
const SelectViewport: FC<BaseSelect.List.Props> = (props) => (
    <BaseSelect.List {...props} />
)

SelectViewport.displayName = 'Select.Viewport'

export default SelectViewport
