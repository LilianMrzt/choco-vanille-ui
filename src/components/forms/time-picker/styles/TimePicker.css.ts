import { style } from '@vanilla-extract/css'

export const TIME_PICKER_STYLES = {
    /**
     * Hides the browser-native clock picker icon on time inputs so the custom
     * IconButton trigger is the only visible way to open the popover.
     */
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

    /** Removes the popover content padding so the panel sits flush. */
    content: style({
        padding: 0,
    }),
}
