import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * Scrollable viewport inside the popup.
 */
const SelectViewport: FC<RadixSelect.SelectViewportProps> = (props) => (
    <RadixSelect.Viewport {...props} />
)

SelectViewport.displayName = 'SelectViewport'

export default SelectViewport
