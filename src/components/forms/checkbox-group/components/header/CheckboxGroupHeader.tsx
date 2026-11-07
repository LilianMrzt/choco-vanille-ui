import type { FC } from 'react'

import Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import type { CheckboxGroupHeaderProps } from '@components/forms/checkbox-group/types'

/**
 * A parent checkbox that controls every checkbox in its group.
 * The containing `CheckboxGroup` must provide `allValues`.
 * Its ref targets the visible span and inputRef the form input.
 * @param props - Label, checkbox events and native attributes.
 * @returns The parent checkbox.
 * @throws {Error} If used outside a group or the group does not supply allValues.
 * @example
 * <CheckboxGroup allValues={['a']} aria-label="Options"><CheckboxGroup.Header label="All" /><CheckboxGroup.Item value="a" label="A" /></CheckboxGroup>
 */
const CheckboxGroupHeader: FC<CheckboxGroupHeaderProps> = (props) => (
    <Checkbox
        {...props}
        parent
    />
)

CheckboxGroupHeader.displayName = 'CheckboxGroup.Header'

export default CheckboxGroupHeader
