import { recipe } from '@vanilla-extract/recipes'

import { TEXT_AREA_SIZES } from '@components/forms/text-area/constants/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const TEXT_AREA_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.normal,
            borderRadius: vars.radius.xs,
            border: `1px solid ${vars.color.border}`,
            backgroundColor: vars.color.card,
            color: vars.color.foreground,
            outline: 'none',
            resize: 'none',
            transition: [
                `border-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&::placeholder': {
                    color: vars.color.mutedForeground,
                },
                // Keyboard focus: full ring + primary border.
                '&:focus-visible': {
                    outline: 'none',
                    borderColor: vars.color.primary,
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                },
                // Click focus (data-mouse-focus set by JS): primary border, NO ring.
                '&[data-mouse-focus]:focus-visible': {
                    boxShadow: 'none',
                    borderColor: vars.color.primary,
                },
                '&:disabled': {
                    cursor: 'not-allowed',
                    opacity: 0.45,
                    backgroundColor: vars.color.muted,
                },
            },
        },
        variants: {
            size: {
                [TEXT_AREA_SIZES.sm]: {
                    minHeight: '4.5rem',
                    paddingInline: vars.space.sm,
                    paddingBlock: vars.space.sm,
                    fontSize: vars.fontSize.sm,
                },
                [TEXT_AREA_SIZES.md]: {
                    minHeight: '5rem',
                    paddingInline: vars.space.md,
                    paddingBlock: vars.space.md,
                    fontSize: vars.fontSize.sm,
                },
                [TEXT_AREA_SIZES.lg]: {
                    minHeight: '5.5rem',
                    paddingInline: vars.space.lg,
                    paddingBlock: vars.space.lg,
                    fontSize: vars.fontSize.md,
                },
            },
            hasError: {
                true: {
                    borderColor: vars.color.destructive,
                    selectors: {
                        '&:hover:not(:disabled)': {
                            borderColor: vars.color.destructive,
                        },
                        '&:focus-visible': {
                            borderColor: vars.color.destructive,
                            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.destructive}`,
                        },
                        '&[data-mouse-focus]:focus-visible': {
                            boxShadow: 'none',
                            borderColor: vars.color.destructive,
                        },
                    },
                },
                false: {},
            },
            hasStartIcon: {
                true: {},
                false: {},
            },
            hasEndAction: {
                true: {},
                false: {},
            },
        },
        compoundVariants: [
            // Start icon: push text right
            { variants: { size: TEXT_AREA_SIZES.sm, hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            { variants: { size: TEXT_AREA_SIZES.md, hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            { variants: { size: TEXT_AREA_SIZES.lg, hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            // End action: push text left (slot width 1.75rem + right offset 0.625rem)
            { variants: { size: TEXT_AREA_SIZES.sm, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: TEXT_AREA_SIZES.md, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: TEXT_AREA_SIZES.lg, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
        ],
        defaultVariants: {
            size: TEXT_AREA_SIZES.md,
            hasError: false,
            hasStartIcon: false,
            hasEndAction: false,
        },
    }),
}
