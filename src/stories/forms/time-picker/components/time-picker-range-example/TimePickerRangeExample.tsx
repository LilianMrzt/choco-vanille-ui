import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker Range example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerRangeExample />
 */
const TimePickerRangeExample = (): ReactElement => (
    <TimePicker
        label={'Opening hours'}
        minTime={'09:00'}
        maxTime={'17:30'}
        minuteStep={15}
    />
)

export default TimePickerRangeExample
