import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const SHEET_TRANSITION_DURATION = '400ms'
const SHEET_TRANSITION_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Styles of the bottom sheet surface.
 *
 * Swipe feedback relies on the CSS variables exposed by Base UI Drawer:
 * `--drawer-swipe-movement-y`, `--drawer-swipe-progress` and
 * `--drawer-swipe-strength`.
 */
export const BOTTOM_SHEET_STYLES = {
    backdrop: style({
        position: 'fixed',
        inset: 0,
        zIndex: vars.zIndex.overlay,
        backgroundColor: vars.color.overlay,
        opacity: 'calc(1 - var(--drawer-swipe-progress, 0))',
        transition: `opacity ${SHEET_TRANSITION_DURATION} ${SHEET_TRANSITION_EASING}`,
        selectors: {
            '&[data-starting-style], &[data-ending-style]': {
                opacity: 0,
            },
            '&[data-swiping]': {
                transitionDuration: '0ms',
            },
            '&[data-ending-style]': {
                transitionDuration: `calc(var(--drawer-swipe-strength, 1) * ${SHEET_TRANSITION_DURATION})`,
            },
        },
        '@media': {
            [REDUCED_MOTION]: {
                transition: 'none',
            },
        },
    }),
    viewport: style({
        position: 'fixed',
        inset: 0,
        zIndex: vars.zIndex.modal,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none',
    }),
    popup: style({
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '40rem',
        maxHeight: 'calc(100dvh - 3rem)',
        paddingTop: vars.space.sm,
        paddingBottom: `max(${vars.space.lg}, env(safe-area-inset-bottom, 0px))`,
        borderTopLeftRadius: vars.radius['2xl'],
        borderTopRightRadius: vars.radius['2xl'],
        backgroundColor: vars.color.surface.elevated,
        color: vars.color.surface.elevatedForeground,
        boxShadow: vars.shadow.lg,
        outline: 'none',
        pointerEvents: 'auto',
        overscrollBehavior: 'contain',
        transform: 'translateY(var(--drawer-swipe-movement-y, 0px))',
        transition: `transform ${SHEET_TRANSITION_DURATION} ${SHEET_TRANSITION_EASING}`,
        willChange: 'transform',
        selectors: {
            '&[data-starting-style], &[data-ending-style]': {
                transform: 'translateY(100%)',
            },
            '&[data-ending-style]': {
                transitionDuration: `calc(var(--drawer-swipe-strength, 1) * ${SHEET_TRANSITION_DURATION})`,
            },
            '&[data-swiping]': {
                userSelect: 'none',
            },
        },
        '@media': {
            [REDUCED_MOTION]: {
                transition: 'none',
            },
        },
    }),
    handle: style({
        flexShrink: 0,
        width: '2.5rem',
        height: '0.3125rem',
        marginInline: 'auto',
        marginBottom: vars.space.sm,
        borderRadius: vars.radius.full,
        backgroundColor: vars.color.border.main,
    }),
    content: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xxs,
        minHeight: 0,
        paddingInline: vars.space.sm,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
    }),
}
