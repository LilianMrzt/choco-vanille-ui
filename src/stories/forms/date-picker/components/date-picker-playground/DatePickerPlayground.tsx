import { DatePicker } from '@components/forms/date-picker'
import { type ComponentProps, type ReactElement } from 'react'
/**
 * Remounts the uncontrolled date field when its initial value changes.
 * @internal Not part of the public package API.
 * @param props - Public date picker props.
 * @returns The field initialized from defaultValue.
 * @example
 * <DatePickerPlayground label="Appointment" />
 */
const DatePickerPlayground = (props: ComponentProps<typeof DatePicker>): ReactElement => (
    <DatePicker
        key={props.defaultValue?.getTime() ?? 'empty'}
        {...props}
    />
)

export default DatePickerPlayground
