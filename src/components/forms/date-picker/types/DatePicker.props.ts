import type { CalendarProps } from '@components/forms/calendar'
import type { TextFieldProps } from '@components/forms/text-field'

export type DatePickerProps = Omit<
    TextFieldProps,
    'type' | 'value' | 'defaultValue' | 'onChange'
> & {
    /** The currently selected date (controlled). */
    value?: Date
    /** The default selected date (uncontrolled). */
    defaultValue?: Date
    /** Called when the selected date changes. */
    onChange?: (date: Date | undefined) => void
    /** Props forwarded to the calendar popover panel. */
    calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>
    /**
     * Accessible name for the calendar popover dialog.
     * Override for i18n.
     * @default 'Calendar'
     */
    calendarAriaLabel?: string
}
