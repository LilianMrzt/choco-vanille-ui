import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALLOUT_ACTION_STYLES = {
    action: style({
        position: 'absolute',
        top: '50%',
        right: vars.space[4],
        transform: 'translateY(-50%)',
    }),
}
