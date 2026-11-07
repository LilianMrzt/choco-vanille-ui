import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const SLIDER_TRACK_STYLES = {
    control: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '2rem',
        touchAction: 'none',
        userSelect: 'none',
        selectors: {
            '&[data-orientation="vertical"]': {
                minHeight: '12rem',
                width: '2rem',
                justifyContent: 'center',
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
            },
        },
    }),
    track: recipe({
        base: {
            position: 'relative',
            width: '100%',
            borderRadius: vars.radius.full,
            backgroundColor: vars.color.surface.muted,
            selectors: {
                '&[data-orientation="vertical"]': {
                    width: '0.375rem',
                    height: '100%',
                },
            },
        },
        variants: {
            size: {
                sm: { height: '0.25rem' },
                md: { height: '0.375rem' },
                lg: { height: '0.5rem' },
            },
        },
        defaultVariants: { size: 'md' },
    }),
    indicator: recipe({
        base: {
            position: 'absolute',
            height: '100%',
            borderRadius: vars.radius.full,
            selectors: {
                '&[data-orientation="vertical"]': {
                    width: '100%',
                },
            },
        },
        variants: {
            color: {
                primary: { backgroundColor: vars.color.primary.main },
                secondary: { backgroundColor: vars.color.secondary.main },
                danger: { backgroundColor: vars.color.danger.main },
            },
        },
        defaultVariants: { color: 'primary' },
    }),
    thumb: recipe({
        base: {
            position: 'absolute',
            borderRadius: vars.radius.full,
            backgroundColor: vars.color.surface.main,
            outline: 'none',
            cursor: 'grab',
            transition: `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
            selectors: {
                '&:focus-visible': {
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
                },
                '&[data-dragging]': {
                    cursor: 'grabbing',
                },
                '&[data-disabled]': {
                    cursor: 'not-allowed',
                },
            },
        },
        variants: {
            size: {
                sm: { width: '1rem', height: '1rem' },
                md: { width: '1.25rem', height: '1.25rem' },
                lg: { width: '1.5rem', height: '1.5rem' },
            },
            color: {
                primary: { border: `2px solid ${vars.color.primary.main}` },
                secondary: { border: `2px solid ${vars.color.secondary.main}` },
                danger: { border: `2px solid ${vars.color.danger.main}` },
            },
        },
        defaultVariants: { size: 'md', color: 'primary' },
    }),
}
