import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const TABS_CONTENT_STYLES = {
    root: style({
        paddingTop: vars.space.md,
        color: vars.color.foreground,
        outline: 'none',
        selectors: {
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
        },
    }),
}
