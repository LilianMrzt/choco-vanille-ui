import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Portal wrapper for the listbox popup.
 */
const SelectPortal: FC<BaseSelect.Portal.Props> = (props) => (
    <BaseSelect.Portal {...props} />
)

SelectPortal.displayName = 'SelectPortal'

export default SelectPortal
