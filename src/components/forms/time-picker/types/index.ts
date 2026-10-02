export type UseTimePickerOptions = {
    /** The currently selected time as `HH:mm` (controlled). */
    value?: string
    /** The default selected time as `HH:mm` (uncontrolled). */
    defaultValue?: string
    /** Called when the selected time changes. */
    onChange?: (time: string | undefined) => void
    /** Explicit id for the input; falls back to a generated id. */
    id?: string
    /** Time used to build a value while none is selected. */
    defaultPanelTime?: string
    /** Earliest selectable time. */
    minTime?: string
    /** Latest selectable time. */
    maxTime?: string
}

export type UseTimePickerReturn = {
    /** Resolved selected time, `undefined` when empty or incomplete. */
    selectedTime: string | undefined
    /** Current value of the time input. */
    inputValue: string
    /** Whether the popover is open. */
    open: boolean
    /** Stable id for the input element. */
    inputId: string
    /** Update the input value while committing valid times. */
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    /** Intercept keys that would open the native time picker. */
    handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    /** Select an hour in the popover, keeping the current minute. */
    handleHourSelect: (hour: string) => void
    /** Select a minute in the popover and close it. */
    handleMinuteSelect: (minute: string) => void
    /** Select the current time and close the popover. */
    handleNowSelect: () => void
    /** Clear the selected time and close the popover. */
    handleClear: () => void
    /** Toggle the popover open state. */
    setOpen: (open: boolean) => void
}
