import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker Actions example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerActionsExample />
 */
const TimePickerActionsExample = (): ReactElement => (
    <TimePicker
        label={'Start time'}
        showNowButton
        clearable
    />
)

export default TimePickerActionsExample
