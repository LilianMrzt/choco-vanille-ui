import { DatePicker } from '@components/forms/date-picker'
import type { ReactElement } from 'react'

/**
 * Renders the DatePicker States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <DatePickerStatesExample />
 */
const DatePickerStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <DatePicker
            label={'Disabled'}
            disabled
        />
        <DatePicker
            label={'Appointment'}
            helperText={'Choose an available date.'}
        />
        <DatePicker
            label={'Invalid date'}
            error={'Choose a valid date.'}
        />
    </div>
)

export default DatePickerStatesExample
