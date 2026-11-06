import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@theme/styles/contract/contract.css.ts'

const wrapper = style({
    display: 'inline-flex',
    alignItems: 'center',
})

const wrapperDisabled = style({
    cursor: 'not-allowed',
    opacity: 0.45,
})

const root = recipe({
    base: {
        flexShrink: 0,
        borderRadius: vars.radius.full,
        border: 'none',
        padding: 0,
        position: 'relative',
        backgroundColor: vars.color.border.main,
        cursor: 'pointer',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.border.strong,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.border.main,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&[data-checked]': {
                backgroundColor: vars.color.primary.main,
            },
            '&[data-checked]:not([data-disabled]):hover': {
                backgroundColor: vars.color.primary.hover,
            },
            '&[data-checked]:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.pressed,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
            },
        },
    },
    variants: {
        size: {
            sm: {
                width: '2.25rem',
                height: '1.25rem',
            },
            md: {
                width: '2.75rem',
                height: '1.5rem',
            },
            lg: {
                width: '3.25rem',
                height: '1.75rem',
            },
        },
        error: {
            true: {
                backgroundColor: vars.color.danger.main,
                selectors: {
                    '&:not([data-disabled]):hover': {
                        backgroundColor: vars.color.danger.hover,
                    },
                    '&:not([data-disabled]):active': {
                        backgroundColor: vars.color.danger.pressed,
                    },
                    '&:focus-visible': {
                        outline: 'none',
                        boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.danger.main}`,
                    },
                    '&[data-checked]': {
                        backgroundColor: vars.color.primary.main,
                    },
                    '&[data-checked]:not([data-disabled]):hover': {
                        backgroundColor: vars.color.primary.hover,
                    },
                    '&[data-checked]:not([data-disabled]):active': {
                        backgroundColor: vars.color.primary.pressed,
                    },
                },
            },
            false: {},
        },
    },
    defaultVariants: {
        size: 'md',
        error: false,
    },
})

const thumb = recipe({
    base: {
        display: 'block',
        borderRadius: vars.radius.full,
        backgroundColor: vars.color.background,
        boxShadow: vars.shadow.sm,
        position: 'absolute',
        top: '0.125rem',
        left: '0.125rem',
        transition: [
            `transform ${vars.duration.fast} ${vars.easing.standard}`,
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&[data-checked]': {
                backgroundColor: vars.color.primary.foreground,
            },
        },
    },
    variants: {
        size: {
            sm: {
                width: '1rem',
                height: '1rem',
                selectors: {
                    '&[data-checked]': {
                        transform: 'translateX(1rem)',
                    },
                },
            },
            md: {
                width: '1.25rem',
                height: '1.25rem',
                selectors: {
                    '&[data-checked]': {
                        transform: 'translateX(1.25rem)',
                    },
                },
            },
            lg: {
                width: '1.5rem',
                height: '1.5rem',
                selectors: {
                    '&[data-checked]': {
                        transform: 'translateX(1.5rem)',
                    },
                },
            },
        },
    },
    defaultVariants: {
        size: 'sm',
    },
})

const label = style({})

const labelDisabled = style({
    cursor: 'not-allowed',
})

/** Customizable styles for the switch and supporting elements. */
export const SWITCH_STYLES = {
    wrapper,
    wrapperDisabled,
    root,
    thumb,
    label,
    labelDisabled,
}
