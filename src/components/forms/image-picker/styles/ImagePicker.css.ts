import { createContainer, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

const previewContainer = createContainer()

const visuallyHidden = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
    border: 0,
} as const

export const IMAGE_PICKER_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xs,
        width: '100%',
        fontFamily: vars.fontFamily.sans,
        selectors: {
            '&[data-mobile="true"]': {
                alignItems: 'center',
            },
        },
    }),
    wrapper: style({
        position: 'relative',
        width: '100%',
    }),
    preview: recipe({
        base: {
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '14rem',
            padding: 0,
            overflow: 'hidden',
            border: `1px solid ${vars.color.border}`,
            backgroundColor: vars.color.muted,
            color: vars.color.text,
            font: 'inherit',
            textAlign: 'center',
            cursor: 'pointer',
            appearance: 'none',
            containerName: previewContainer,
            containerType: 'inline-size',
            WebkitTapHighlightColor: 'transparent',
            transition: [
                `border-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&[data-has-value="false"]': {
                    borderStyle: 'dashed',
                    backgroundColor: vars.color.background,
                },
                '&:hover:not([data-disabled="true"])': {
                    borderColor: vars.color.primary,
                },
                '&:focus-visible:not([data-disabled="true"])': {
                    outline: 'none',
                    borderColor: vars.color.primary,
                    boxShadow: `0 0 0 3px ${vars.color.primarySubtle}`,
                },
                '&[data-dragging="true"]:not([data-disabled="true"])': {
                    borderColor: vars.color.primary,
                    backgroundColor: vars.color.primarySubtle,
                    boxShadow: `0 0 0 3px ${vars.color.primarySubtle}`,
                },
                '&[data-has-error="true"]': {
                    borderColor: vars.color.destructive,
                },
                '&[data-disabled="true"]': {
                    cursor: 'not-allowed',
                    opacity: 0.55,
                },
            },
        },
        variants: {
            shape: {
                [IMAGE_PICKER_SHAPES.square]: {
                    borderRadius: vars.radius.none,
                },
                [IMAGE_PICKER_SHAPES.rounded]: {
                    borderRadius: vars.radius.lg,
                },
                [IMAGE_PICKER_SHAPES.circle]: {
                    borderRadius: vars.radius.full,
                    aspectRatio: '1',
                    height: 'auto',
                },
            },
        },
        defaultVariants: {
            shape: IMAGE_PICKER_SHAPES.rounded,
        },
    }),
    empty: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vars.space.sm,
        height: '100%',
        padding: vars.space.lg,
        textAlign: 'center',
    }),
    emptyIcon: style({
        color: vars.color.primary,
    }),
    emptyText: style({
        maxWidth: '22rem',
        '@container': {
            [`${previewContainer} (max-width: 9rem)`]: {
                display: 'none',
            },
        },
    }),
    image: style({
        display: 'block',
        width: '100%',
        height: '100%',
    }),
    // Desktop-only "change" hint revealed on hover, focus and drag.
    scrim: style({
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vars.space.xs,
        padding: vars.space.sm,
        backgroundColor: vars.color.overlay,
        color: vars.color.primaryForeground,
        opacity: 0,
        pointerEvents: 'none',
        transition: `opacity ${vars.duration.fast} ${vars.easing.standard}`,
        selectors: {
            'button:hover:not([data-disabled="true"]) > &, button:focus-visible > &, button[data-dragging="true"] > &': {
                opacity: 1,
            },
        },
    }),
    scrimText: style({
        '@container': {
            [`${previewContainer} (max-width: 7rem)`]: {
                display: 'none',
            },
        },
    }),
    removeButton: recipe({
        base: {
            position: 'absolute',
        },
        variants: {
            shape: {
                [IMAGE_PICKER_SHAPES.square]: {
                    top: vars.space.sm,
                    right: vars.space.sm,
                },
                [IMAGE_PICKER_SHAPES.rounded]: {
                    top: vars.space.sm,
                    right: vars.space.sm,
                },
                // Sits on the circle's edge, like an avatar badge.
                [IMAGE_PICKER_SHAPES.circle]: {
                    top: '7%',
                    right: '7%',
                    transform: 'translate(35%, -35%)',
                },
            },
        },
        defaultVariants: {
            shape: IMAGE_PICKER_SHAPES.rounded,
        },
    }),
    actions: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
        gap: vars.space.sm,
        width: '100%',
        marginTop: vars.space.sm,
    }),
    visuallyHidden: style(visuallyHidden),
    input: style(visuallyHidden),
}
