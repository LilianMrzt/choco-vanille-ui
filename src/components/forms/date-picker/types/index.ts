import type { CalendarDate, DateValue } from '@internationalized/date'

export type UseDatePickerOptions = {
    /** The currently selected date (controlled). */
    value?: Date
    /** The default selected date (uncontrolled). */
    defaultValue?: Date
    /** Called when the selected date changes. */
    onChange?: (date: Date | undefined) => void
}

export type UseDatePickerReturn = {
    /** Resolved selected date. */
    selectedDate: Date | undefined
    /** Selected date as a React Aria calendar value (`null` when empty). */
    calendarValue: CalendarDate | null
    /** Whether the calendar popover is open. */
    open: boolean
    /** Open or close the calendar popover. */
    setOpen: (open: boolean) => void
    /** Receives the value committed by the segmented field. */
    handleFieldChange: (value: DateValue | null) => void
    /** Select a date from the calendar and close the popover. */
    handleCalendarSelect: (date: Date | undefined) => void
}
