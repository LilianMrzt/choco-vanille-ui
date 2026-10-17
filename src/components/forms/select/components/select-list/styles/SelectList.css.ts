import { style } from '@vanilla-extract/css'

/**
 * Lets the list shrink inside the popup's `max-height` and scroll instead of being clipped.
 */
export const SELECT_LIST_STYLES = {
    list: style({
        minHeight: 0,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
    }),
}
