import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const chevron = style({
    flexShrink: 0,
    transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-expanded="true"]': {
            transform: 'rotate(180deg)',
        },
        '[data-panel-open] &': {
            transform: 'rotate(180deg)',
        },
    },
})

export const ROTATING_CHEVRON_STYLES = {
    chevron,
}
