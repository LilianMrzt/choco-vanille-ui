import type { CalendarProps } from '@components/forms/calendar'
import type { TextFieldProps } from '@components/forms/text-field'

export type DatePickerProps = Pick<
    TextFieldProps,
    | 'id'
    | 'label'
    | 'error'
    | 'helperText'
    | 'required'
    | 'showRequiredIndicator'
    | 'disabled'
    | 'size'
    | 'width'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
> & {
    /** Form field name, forwarded to the underlying date field. */
    name?: string
    /** The currently selected date (controlled). */
    value?: Date
    /** The default selected date (uncontrolled). */
    defaultValue?: Date
    /** Called when the selected date changes. */
    onChange?: (date: Date | undefined) => void
    /** Earliest selectable date. Earlier days are disabled in the calendar. */
    minDate?: Date
    /** Latest selectable date. Later days are disabled in the calendar. */
    maxDate?: Date
    /** Props forwarded to the calendar popover panel. */
    calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>
    /**
     * Accessible name for the calendar popover dialog.
     * Override for i18n.
     * @default 'Calendar'
     */
    calendarAriaLabel?: string
}
