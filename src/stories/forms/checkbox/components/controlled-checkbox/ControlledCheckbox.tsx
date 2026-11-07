import { Checkbox } from '@/components/forms/checkbox'
import type { CheckboxProps } from '@components/forms/checkbox'
import type { ReactElement } from 'react'

/**
 * Renders the Checkbox interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @param args - Controlled props and the callback supplied by the story renderer.
 * @returns The pure checkbox field.
 * @example
 * <ControlledCheckbox />
 */
const ControlledCheckbox = (args: CheckboxProps): ReactElement => <Checkbox {...args} />

export default ControlledCheckbox
