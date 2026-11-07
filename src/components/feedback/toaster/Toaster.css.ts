import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const viewport = style({
    selectors: {
        '&&': {
            zIndex: vars.zIndex.toast,
        },
    },
})

const toast = style({
    width: '100%',
    selectors: {
        '&&[data-expanded="false"][data-front="false"]': {
            vars: {
                '--lift-amount': `calc(var(--lift) * ${vars.space[16]})`,
            },
        },
        '&&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: vars.space[4],
        },
    },
})

export const TOASTER_STYLES = {
    viewport,
    toast,
}
