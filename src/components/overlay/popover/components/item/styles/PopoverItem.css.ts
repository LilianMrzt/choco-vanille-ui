import { style } from '@vanilla-extract/css'

/** Native button reset required when using the shared overlay item recipe. */
export const POPOVER_ITEM_STYLES = {
    root: style({
        width: '100%',
        appearance: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        textAlign: 'start',
    }),
}
