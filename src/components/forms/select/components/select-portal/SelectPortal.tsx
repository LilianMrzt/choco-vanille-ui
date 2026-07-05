import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * Portal wrapper for the listbox popup.
 */
const SelectPortal: FC<RadixSelect.SelectPortalProps> = (props) => (
    <RadixSelect.Portal {...props} />
)

SelectPortal.displayName = 'SelectPortal'

export default SelectPortal
