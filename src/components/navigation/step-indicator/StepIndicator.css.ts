import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({ width: '100%' })
const list = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[4],
    padding: 0,
    margin: 0,
    listStyle: 'none',
})

export const STEP_INDICATOR_STYLES = { root, list }
