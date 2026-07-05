import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * The chevron icon rendered inside the trigger.
 * Usually provided automatically by `Select.Trigger`; exposed for advanced
 * composition.
 */
const SelectIcon: FC<RadixSelect.SelectIconProps> = (props) => (
    <RadixSelect.Icon {...props} />
)

SelectIcon.displayName = 'SelectIcon'

export default SelectIcon
