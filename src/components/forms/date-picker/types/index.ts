import type { CalendarProps } from '@components/forms/calendar'
import type { TextFieldProps } from '@components/forms/text-field'

/** Props for a button-based date picker. Required validation is application-owned. */
export type DatePickerProps = Readonly<Pick<TextFieldProps,
    | 'id' | 'label' | 'error' | 'helperText' | 'required' | 'showRequiredIndicator'
    | 'disabled' | 'size' | 'width' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
> & {
    /** Name of the hidden form field, serialized as a local YYYY-MM-DD date. */
    name?: string
    /** Controlled date; include this prop even when the value is undefined. */
    value?: Date
    /** Initial uncontrolled date, also restored by form reset. */
    defaultValue?: Date
    /** Called with the selected local date, or undefined when it is cleared. */
    onChange?: (date: Date | undefined) => void
    /** Earliest selectable local calendar day, inclusive. */
    minDate?: Date
    /** Latest selectable local calendar day, inclusive. */
    maxDate?: Date
    /** Calendar configuration excluding its selection and locale. An explicit month limits the initial day focus to that displayed month. */
    calendarProps?: Omit<Extract<CalendarProps, { mode: 'single' }>, 'mode' | 'selected' | 'defaultSelected' | 'onSelect' | 'locale'>
    /** Accessible dialog name; defaults to "Calendar". */
    calendarAriaLabel?: string
    /** BCP 47 locale for the numeric date and calendar. The date defaults to `fr-FR`; the calendar defaults to the runtime locale. */
    locale?: string
    /** Text displayed when no date is selected. Defaults to "Select a date". */
    placeholder?: string
    /** Accessible required-state description. Defaults to "Required". */
    requiredText?: string
}>
