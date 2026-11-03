import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const root = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.xxs,
    minWidth: 0,
    padding: vars.space.xxs,
    border: 'none',
    borderRadius: vars.radius.sm,
    background: 'transparent',
    color: vars.color.text.primary,
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: vars.fontFamily.mono,
    fontSize: vars.fontSize.xs,
    overflowWrap: 'anywhere',
    selectors: {
        '&:hover': {
            background: vars.color.surface.muted,
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: vars.space.xxs,
        },
    },
})

const main = style({
    gridColumn: '1 / -1',
})

const swatch = style({
    width: '100%',
    height: vars.space['3xl'],
    borderRadius: vars.radius.sm,
    border: `1px solid ${vars.color.border.main}`,
})

const value = style({
    color: vars.color.text.secondary,
})

const feedback = style({
    minHeight: '1.5em',
    color: vars.color.primary.subtleForeground,
})

export const COLOR_SWATCH_STYLES = {
    root,
    main,
    swatch,
    value,
    feedback,
}
