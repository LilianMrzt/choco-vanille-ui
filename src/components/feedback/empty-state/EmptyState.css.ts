import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    alignItems: 'center',
    justifyContent: 'center',
    padding: vars.space[48],
    textAlign: 'center',
})

const content = style({
    maxWidth: '32rem',
})

const action = style({
    marginTop: vars.space[12],
})

export const EMPTY_STATE_STYLES = {
    root,
    content,
    action,
}
