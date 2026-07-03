export type UseDatePickerOptions = {
    /** The currently selected date (controlled). */
    value?: Date
    /** The default selected date (uncontrolled). */
    defaultValue?: Date
    /** Called when the selected date changes. */
    onChange?: (date: Date | undefined) => void
    /** Explicit id for the input; falls back to a generated id. */
    id?: string
}

export type UseDatePickerReturn = {
    /** Resolved selected date. */
    selectedDate: Date | undefined
    /** Current value of the date input. */
    inputValue: string
    /** Whether the calendar popover is open. */
    open: boolean
    /** Stable id for the input element. */
    inputId: string
    /** Update the input value while parsing valid dates. */
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    /** Intercept keys that would open the native date picker. */
    handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    /** Select a date from the calendar and close the popover. */
    handleCalendarSelect: (date: Date | undefined) => void
    /** Toggle the popover open state. */
    setOpen: (open: boolean) => void
}
