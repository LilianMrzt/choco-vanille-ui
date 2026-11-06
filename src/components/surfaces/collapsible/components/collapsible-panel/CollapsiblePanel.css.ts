import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    display: 'grid',
    gridTemplateRows: '0fr',
    color: vars.color.surface.mutedForeground,
    fontSize: vars.fontSize[14],
    lineHeight: '1.5',
    outline: 'none',
    transition: [
        `grid-template-rows ${vars.duration.normal} ${vars.easing.standard}`,
        `padding-bottom ${vars.duration.normal} ${vars.easing.standard}`,
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    opacity: 0,
    selectors: {
        '&[data-open]': {
            gridTemplateRows: '1fr',
            opacity: 1,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
        },
    },
})

const inner = style({
    overflow: 'hidden',
})

/** Styles for the collapsible panel and its content. */
export const COLLAPSIBLE_PANEL_STYLES = {
    root,
    inner,
}
