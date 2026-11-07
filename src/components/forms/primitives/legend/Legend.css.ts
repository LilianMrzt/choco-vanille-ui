import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Minimal reset and spacing for the legend element.
 *
 * Browsers apply inconsistent padding to `<legend>`. We remove it and add a
 * small bottom margin so the legend sits cleanly above the grouped controls.
 */
const localLegendRoot = style({
    display: 'block',
    width: '100%',
    padding: 0,
    marginBottom: vars.space[8],
})

export const LEGEND_STYLES = {
    root: localLegendRoot,
}
