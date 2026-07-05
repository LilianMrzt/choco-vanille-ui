import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * The selected value text rendered inside the trigger.
 */
const SelectValue: FC<RadixSelect.SelectValueProps> = (props) => (
    <RadixSelect.Value {...props} />
)

SelectValue.displayName = 'SelectValue'

export default SelectValue
