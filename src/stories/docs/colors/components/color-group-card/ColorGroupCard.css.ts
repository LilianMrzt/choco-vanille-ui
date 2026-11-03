import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const swatches = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 110px), 1fr))',
    gap: vars.space.sm,
})

export const COLOR_GROUP_CARD_STYLES = {
    swatches,
}
