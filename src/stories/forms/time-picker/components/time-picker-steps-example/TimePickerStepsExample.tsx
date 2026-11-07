import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker Steps example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerStepsExample />
 */
const TimePickerStepsExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TimePicker
            label={'Every 15 minutes'}
            minuteStep={15}
        />
        <TimePicker
            label={'Every 6 hours'}
            hourStep={6}
            minuteStep={30}
        />
    </div>
)

export default TimePickerStepsExample
