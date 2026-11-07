import ControlledCheckbox from '@stories/forms/checkbox/components/controlled-checkbox/ControlledCheckbox'
import type { CheckboxProps } from '@components/forms/checkbox'
import type { ReactElement } from 'react'

/**
 * Presents the standalone checkbox field.
 * @internal Storybook-only example; not part of the public package API.
 * @param props - Controls forwarded to each API example.
 * @returns The controlled checkbox.
 * @example
 * <CheckboxPlayground {...args} />
 */
const CheckboxPlayground = (props: CheckboxProps): ReactElement => (
    <ControlledCheckbox {...props} />
)

export default CheckboxPlayground
