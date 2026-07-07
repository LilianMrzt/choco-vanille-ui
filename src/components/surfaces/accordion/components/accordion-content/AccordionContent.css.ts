import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const ACCORDION_CONTENT_STYLES = {
    root: style({
        display: 'grid',
        gridTemplateRows: '0fr',
        paddingBottom: 0,
        color: vars.color.mutedForeground,
        fontSize: vars.fontSize.sm,
        lineHeight: vars.lineHeight.normal,
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
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
        },
    }),
    inner: style({
        overflow: 'hidden',
    }),
}
