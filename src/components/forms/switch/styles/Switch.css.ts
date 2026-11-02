import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const SWITCH_STYLES = {
    wrapper: style({
        display: 'inline-flex',
        alignItems: 'center',
    }),
    wrapperDisabled: style({
        cursor: 'not-allowed',
        opacity: 0.45,
    }),
    root: recipe({
        base: {
            flexShrink: 0,
            borderRadius: vars.radius.full,
            border: 'none',
            padding: 0,
            position: 'relative',
            backgroundColor: vars.color.border,
            cursor: 'pointer',
            outline: 'none',
            transition: [
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&:not([data-disabled]):hover': {
                    backgroundColor: vars.color.borderStrong,
                },
                '&:not([data-disabled]):active': {
                    backgroundColor: vars.color.border,
                },
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                },
                '&[data-checked]': {
                    backgroundColor: vars.color.primary,
                },
                '&[data-checked]:not([data-disabled]):hover': {
                    backgroundColor: vars.color.primaryHover,
                },
                '&[data-checked]:not([data-disabled]):active': {
                    backgroundColor: vars.color.primaryActive,
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
                    backgroundColor: vars.color.destructive,
                    selectors: {
                        '&:not([data-disabled]):hover': {
                            backgroundColor: vars.color.destructiveHover,
                        },
                        '&:not([data-disabled]):active': {
                            backgroundColor: vars.color.destructiveActive,
                        },
                        '&:focus-visible': {
                            outline: 'none',
                            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.destructive}`,
                        },
                        '&[data-checked]': {
                            backgroundColor: vars.color.primary,
                        },
                        '&[data-checked]:not([data-disabled]):hover': {
                            backgroundColor: vars.color.primaryHover,
                        },
                        '&[data-checked]:not([data-disabled]):active': {
                            backgroundColor: vars.color.primaryActive,
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
    }),
    thumb: recipe({
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
                    backgroundColor: vars.color.primaryForeground,
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
    }),
    label: style({
    }),
    labelDisabled: style({
        cursor: 'not-allowed',
    }),
}
