import { style, keyframes } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const fadeZoomIn = keyframes({
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
})

const fadeZoomOut = keyframes({
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.95)' },
})

export const TOOLTIP_STYLES = {
    content: style({
        zIndex: vars.zIndex.tooltip,
        borderRadius: vars.radius.xs,
        backgroundColor: vars.color.surfaceElevated,
        color: vars.color.surfaceElevatedForeground,
        paddingInline: vars.space.md,
        paddingBlock: vars.space.xs,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.xs,
        lineHeight: vars.lineHeight.normal,
        filter: vars.dropShadow.sm,
        transformOrigin: 'var(--transform-origin)',
        selectors: {
            '&[data-open]': {
                animation: `${fadeZoomIn} 0.15s ease-out`,
            },
            '&[data-closed]': {
                animation: `${fadeZoomOut} 0.15s ease-in`,
            },
        },
    }),
    arrow: style({
        position: 'relative',
        display: 'block',
        width: 12,
        height: 6,
        backgroundColor: vars.color.surfaceElevated,
        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
        selectors: {
            '&[data-side="top"]': {
                bottom: -6,
            },
            '&[data-side="bottom"]': {
                top: -6,
                transform: 'rotate(180deg)',
            },
            '&[data-side="left"]': {
                right: -9,
                transform: 'rotate(-90deg)',
            },
            '&[data-side="right"]': {
                left: -9,
                transform: 'rotate(90deg)',
            },
        },
    }),
}
