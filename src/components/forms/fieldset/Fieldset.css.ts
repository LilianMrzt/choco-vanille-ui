import { style } from '@vanilla-extract/css'

/**
 * Minimal reset for the fieldset element.
 *
 * Browsers render a visible border and non-zero padding on `<fieldset>` by
 * default. We remove those so the component is visually neutral while keeping
 * its semantic and accessibility behavior.
 */
const root = style({
    display: 'block',
    minWidth: 0,
    margin: 0,
    padding: 0,
    border: 'none',
})

export const FIELDSET_STYLES = {
    root,
}
