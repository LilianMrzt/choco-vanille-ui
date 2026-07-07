import { globalStyle, style } from '@vanilla-extract/css'

// End action slot
//
// Button size is forced to 1.75rem (see globalStyle below).
// Right offset = (fieldHeight_md − buttonHeight) / 2 = (2.5rem − 1.75rem) / 2 = 0.375rem
// => same gap on top, bottom AND right for the md size (most common).
export const TEXT_FIELD_END_ACTION_STYLES = {
    root: style({
        position: 'absolute',
        right: '0.625rem',
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.75rem',
        marginBlock: 'auto',
    }),
}

/** Force the IconButton inside the end-action slot to a compact 1.75rem square. */
globalStyle(`${TEXT_FIELD_END_ACTION_STYLES.root} button`, {
    height: '1.75rem',
    width: '1.75rem',
})
