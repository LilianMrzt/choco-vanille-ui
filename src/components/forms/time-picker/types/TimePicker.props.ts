import type { TextFieldProps } from '@components/forms/text-field'

export type TimePickerProps = Omit<
    TextFieldProps,
    'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max'
> & {
    /** The currently selected time as `HH:mm` (controlled). */
    value?: string
    /** The default selected time as `HH:mm` (uncontrolled). */
    defaultValue?: string
    /** Called with the new `HH:mm` time, or `undefined` when it is cleared. */
    onChange?: (time: string | undefined) => void
    /**
     * Time the popover scrolls to, and builds from, while no time is selected,
     * as `HH:mm`. It is not written to the input until the user picks a value.
     * @example '09:00'
     */
    defaultPanelTime?: string
    /** Earliest selectable time as `HH:mm`. Earlier options are not listed. */
    minTime?: string
    /** Latest selectable time as `HH:mm`. Later options are not listed. */
    maxTime?: string
    /**
     * Interval between the hours listed in the popover.
     * @default 1
     */
    hourStep?: number
    /**
     * Interval between the minutes listed in the popover. Any minute can still
     * be typed in the input.
     * @default 5
     */
    minuteStep?: number
    /** Shows a footer button that selects the current time. */
    showNowButton?: boolean
    /** Shows a footer button that clears the selected time. */
    clearable?: boolean
    /**
     * Label of the "now" button.
     * Override for i18n.
     * @default 'Now'
     */
    nowLabel?: string
    /**
     * Label of the clear button.
     * Override for i18n.
     * @default 'Clear'
     */
    clearLabel?: string
    /**
     * Accessible name for the time popover dialog.
     * Override for i18n.
     * @default 'Time'
     */
    panelAriaLabel?: string
    /**
     * Visible title and accessible name of the hours list.
     * Override for i18n.
     * @default 'Hours'
     */
    hoursAriaLabel?: string
    /**
     * Visible title and accessible name of the minutes list.
     * Override for i18n.
     * @default 'Minutes'
     */
    minutesAriaLabel?: string
    /**
     * Accessible name for the button that opens the popover.
     * Override for i18n.
     * @default 'Open time picker'
     */
    triggerAriaLabel?: string
}
