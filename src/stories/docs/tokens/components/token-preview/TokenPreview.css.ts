import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const text = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize[20],
    lineHeight: '1.2',
    overflowWrap: 'anywhere',
})

const ruler = style({
    display: 'flex',
    alignItems: 'center',
    minHeight: '2rem',
    borderLeft: `1px solid ${vars.color.border.strong}`,
    backgroundImage: `repeating-linear-gradient(to right, transparent, transparent calc(1rem - 1px), ${vars.color.border.subtle} calc(1rem - 1px), ${vars.color.border.subtle} 1rem)`,
})

const bar = style({
    flexShrink: 0,
    height: vars.space[8],
    backgroundColor: vars.color.primary.main,
    borderRadius: '0 2px 2px 0',
})

const radius = style({
    width: '5rem',
    height: '2.5rem',
    border: `1px solid ${vars.color.primary.border}`,
    backgroundColor: vars.color.primary.subtle,
})

const surface = style({
    width: '5rem',
    height: '2.5rem',
    margin: `${vars.space[16]} ${vars.space[20]}`,
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius[8],
    backgroundColor: vars.color.surface.elevated,
})

const stack = style({
    position: 'relative',
    isolation: 'isolate',
    width: '5rem',
    height: '3rem',
})

const backLayer = style({
    position: 'absolute',
    inset: '0.5rem 1rem 0 0',
    zIndex: 0,
    border: `1px solid ${vars.color.border.strong}`,
    borderRadius: vars.radius[6],
    backgroundColor: vars.color.surface.muted,
})

const frontLayer = style({
    position: 'absolute',
    inset: '0 0 0.5rem 1rem',
    border: `1px solid ${vars.color.primary.border}`,
    borderRadius: vars.radius[6],
    backgroundColor: vars.color.primary.subtle,
})

const motion = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space[12],
    maxWidth: '100%',
    minHeight: '2.75rem',
    padding: `${vars.space[4]} ${vars.space[8]}`,
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius[8],
    backgroundColor: vars.color.surface.main,
    color: vars.color.text.secondary,
    font: 'inherit',
    fontSize: vars.fontSize[12],
    cursor: 'pointer',
    selectors: {
        '&:hover': {
            borderColor: vars.color.primary.border,
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: vars.space[2],
        },
    },
})

const track = style({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '6rem',
    height: '1.5rem',
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.surface.muted,
})

const indicator = style({
    width: vars.space[16],
    height: vars.space[16],
    marginInline: vars.space[4],
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.primary.main,
    transitionProperty: 'transform',
    transitionDuration: vars.duration.slow,
    transitionTimingFunction: vars.easing.standard,
    selectors: {
        [`${motion}:hover &, ${motion}:focus-visible &`]: {
            transform: 'translateX(4rem)',
        },
    },
    '@media': {
        '(prefers-reduced-motion: reduce)': {
            transitionProperty: 'none',
            selectors: {
                [`${motion}:hover &, ${motion}:focus-visible &`]: {
                    transform: 'none',
                },
            },
        },
    },
})

export const TOKEN_PREVIEW_STYLES = {
    text,
    ruler,
    bar,
    radius,
    surface,
    stack,
    backLayer,
    frontLayer,
    motion,
    track,
    indicator,
}
