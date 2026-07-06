import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * The selected value text rendered inside the trigger.
 */
const SelectValue: FC<BaseSelect.Value.Props> = (props) => (
    <BaseSelect.Value {...props} />
)

SelectValue.displayName = 'SelectValue'

export default SelectValue
