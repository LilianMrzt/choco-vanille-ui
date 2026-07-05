import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

/**
 * Semantic group of items, optionally paired with `Select.Label`.
 */
const SelectGroup: FC<RadixSelect.SelectGroupProps> = (props) => (
    <RadixSelect.Group {...props} />
)

SelectGroup.displayName = 'SelectGroup'

export default SelectGroup
