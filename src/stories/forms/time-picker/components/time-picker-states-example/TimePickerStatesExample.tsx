import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerStatesExample />
 */
const TimePickerStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TimePicker
            label={'Disabled'}
            disabled
        />
        <TimePicker
            label={'Start time'}
            helperText={'Choose an available time.'}
        />
        <TimePicker
            label={'Invalid time'}
            error={'Choose a valid time.'}
        />
    </div>
)

export default TimePickerStatesExample
