import { style } from '@vanilla-extract/css'

/**
 * Hides the browser-native calendar picker icon on date inputs so the
 * custom IconButton trigger is the only visible way to open the calendar
 * popover.
 */
export const DATE_PICKER_STYLES = {
    input: style({
        selectors: {
            '&::-webkit-calendar-picker-indicator': {
                display: 'none',
            },
            '&::-webkit-inner-spin-button': {
                display: 'none',
            },
        },
    }),

    /** Removes the popover content padding so the calendar sits flush. */
    content: style({
        padding: 0,
    }),

    /** Removes the calendar border when rendered inside the date picker popover. */
    calendar: style({
        border: 'none',
    }),
}
