import { globalStyle, style } from '@vanilla-extract/css'

// End action slot
//
// Button size is forced to 1.75rem (see globalStyle below).
// Right offset = 0.625rem, top offset = 0.625rem to align with the textarea padding.
export const TEXT_AREA_END_ACTION_STYLES = {
    root: style({
        position: 'absolute',
        right: '0.625rem',
        top: '0.625rem',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        width: '1.75rem',
    }),
}

/** Force the IconButton inside the end-action slot to a compact 1.75rem square. */
globalStyle(`${TEXT_AREA_END_ACTION_STYLES.root} button`, {
    height: '1.75rem',
    width: '1.75rem',
})
