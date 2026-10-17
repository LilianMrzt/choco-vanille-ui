import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const CALLOUT_ACTION_STYLES = {
    action: style({
        position: 'absolute',
        top: '50%',
        right: vars.space.xs,
        transform: 'translateY(-50%)',
    }),
}
