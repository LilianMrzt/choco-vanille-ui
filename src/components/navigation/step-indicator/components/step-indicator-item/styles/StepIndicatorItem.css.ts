import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const STEP_INDICATOR_ITEM_STYLES = {
    button: style({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        padding: 0,
        border: 0,
        borderRadius: vars.radius.full,
        background: 'transparent',
        cursor: 'pointer',
        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.primary}`,
                outlineOffset: '2px',
            },
            '&:hover:not(:disabled)': {
                opacity: 0.8,
            },
        },
    }),
    staticItem: style({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
    }),
    dot: style({
        display: 'block',
        width: '0.5rem',
        height: '0.5rem',
        borderRadius: vars.radius.full,
        backgroundColor: vars.color.borderStrong,
        transition: 'transform 150ms ease, background-color 150ms ease',
    }),
    dotCurrent: style({
        width: '0.625rem',
        height: '0.625rem',
        backgroundColor: vars.color.primary,
        boxShadow: `0 0 0 3px ${vars.color.primarySubtle}`,
    }),
    dotCompleted: style({
        backgroundColor: vars.color.primary,
    }),
}
