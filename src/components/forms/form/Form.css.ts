import { style } from '@vanilla-extract/css'

/**
 * Minimal reset for the form root.
 *
 * The component intentionally carries no visual opinion: it is a block-level
 * container that fills the width of its parent, leaving layout and spacing to
 * the consumer (e.g. `Flex` or `Stack`).
 */
export const FORM_STYLES = {
    root: style({
        display: 'block',
        width: '100%',
        margin: 0,
    }),
}
