import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

/**
 * Semantic group of items, optionally paired with `Select.Label`.
 */
const SelectGroup: FC<BaseSelect.Group.Props> = (props) => (
    <BaseSelect.Group {...props} />
)

SelectGroup.displayName = 'SelectGroup'

export default SelectGroup
