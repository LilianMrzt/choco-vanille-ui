import { memo, type FC } from 'react'

import Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import { useCheckboxGroupContext } from '@components/forms/checkbox-group/context/CheckboxGroup.context.ts'
import type { CheckboxProps } from '@components/forms/checkbox/types/Checkbox.props.ts'

/**
 * A parent checkbox that controls every checkbox in its group.
 * The containing `CheckboxGroup` must provide `allValues`.
 */
const CheckboxGroupHeader: FC<CheckboxProps> = memo((props) => {
    const { value, allValues, onValueChange } = useCheckboxGroupContext()
    const checked = value.length === allValues.length
    const indeterminate = value.length > 0 && !checked

    return (
        <Checkbox
            {...props}
            checked={checked}
            indeterminate={indeterminate}
            onCheckedChange={(_, eventDetails) => {
                onValueChange(checked ? [] : allValues, eventDetails)
            }}
        />
    )
})

CheckboxGroupHeader.displayName = 'CheckboxGroup.Header'

export default CheckboxGroupHeader
