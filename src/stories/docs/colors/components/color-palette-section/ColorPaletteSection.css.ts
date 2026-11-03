import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
    gap: vars.space.lg,
    alignItems: 'start',
})

export const COLOR_PALETTE_SECTION_STYLES = {
    grid,
}
