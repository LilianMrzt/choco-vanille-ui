import { style, keyframes } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const fadeZoomIn = keyframes({
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
})

const fadeZoomOut = keyframes({
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.95)' },
})

export const tooltipContentClass = style({
    zIndex: vars.zIndex.tooltip,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.color.popover,
    color: vars.color.popoverForeground,
    paddingInline: vars.space.md,
    paddingBlock: vars.space.xs,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.normal,
    filter: vars.dropShadow.sm,
    transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
    selectors: {
        '&[data-state="delayed-open"], &[data-state="instant-open"]': {
            animation: `${fadeZoomIn} 0.15s ease-out`,
        },
        '&[data-state="closed"]': {
            animation: `${fadeZoomOut} 0.15s ease-in`,
        },
    },
})

export const tooltipArrowClass = style({
    fill: vars.color.popover,
})
