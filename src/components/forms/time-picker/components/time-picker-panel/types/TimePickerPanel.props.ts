export type TimePickerPanelProps = {
    /** Selected time as `HH:mm`, if any. */
    selectedTime: string | undefined
    /** Time used as reference (scroll position, minute bounds) when none is selected. */
    defaultPanelTime: string | undefined
    /** Earliest selectable time. */
    minTime: string | undefined
    /** Latest selectable time. */
    maxTime: string | undefined
    /** Interval between the listed hours. */
    hourStep: number
    /** Interval between the listed minutes. */
    minuteStep: number
    /** Title and accessible name of the hours list. */
    hoursAriaLabel: string
    /** Title and accessible name of the minutes list. */
    minutesAriaLabel: string
    /** Whether to show the "now" footer button. */
    showNowButton: boolean
    /** Whether to show the clear footer button. */
    clearable: boolean
    /** Label of the "now" button. */
    nowLabel: string
    /** Label of the clear button. */
    clearLabel: string
    /** Called when an hour is chosen. */
    onHourSelect: (hour: string) => void
    /** Called when a minute is chosen. */
    onMinuteSelect: (minute: string) => void
    /** Called when the "now" button is pressed. */
    onNowSelect: () => void
    /** Called when the clear button is pressed. */
    onClear: () => void
}
