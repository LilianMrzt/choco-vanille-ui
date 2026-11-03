import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
    gap: vars.space.md,
})

export const TOKEN_REFERENCE_STYLES = {
    grid,
}
