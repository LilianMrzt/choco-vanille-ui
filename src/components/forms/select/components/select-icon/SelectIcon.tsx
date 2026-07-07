import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * The chevron icon rendered inside the trigger.
 * Usually provided automatically by `Select.Trigger`; exposed for advanced
 * composition.
 */
const SelectIcon: FC<BaseSelect.Icon.Props> = (props) => (
    <BaseSelect.Icon {...props} />
)

SelectIcon.displayName = 'Select.Icon'

export default SelectIcon
