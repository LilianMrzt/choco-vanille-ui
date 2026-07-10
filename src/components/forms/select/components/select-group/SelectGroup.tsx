import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

/**
 * Semantic group of items, optionally paired with `Select.Label`.
 */
const SelectGroup: FC<BaseSelect.Group.Props> = memo((props) => (
    <BaseSelect.Group {...props} />
))

SelectGroup.displayName = 'Select.Group'

export default SelectGroup
