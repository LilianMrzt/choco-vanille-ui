import { recipe } from '@vanilla-extract/recipes'
import { TEXT_FIELD_SIZES } from '@components/forms/text-field/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const TEXT_FIELD_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
            fontFamily: vars.fontFamily.sans,
            fontSize: vars.fontSize[16],
            lineHeight: '1.5',
            borderRadius: vars.radius[4],
            border: `1px solid ${vars.color.border.main}`,
            backgroundColor: vars.color.surface.main,
            color: vars.color.text.primary,
            outline: 'none',
            transition: [
                `border-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&::placeholder': {
                    color: vars.color.text.tertiary,
                },
                // Keyboard focus: full ring + primary border.
                '&:focus-visible': {
                    outline: 'none',
                    borderColor: vars.color.primary.main,
                    boxShadow: 'none',
                },
                // Click focus (data-mouse-focus set by JS): primary border, NO ring.
                '&[data-mouse-focus]:focus-visible': {
                    boxShadow: 'none',
                    borderColor: vars.color.primary.main,
                },
                '&:disabled': {
                    cursor: 'not-allowed',
                    opacity: 0.45,
                    backgroundColor: vars.color.surface.muted,
                },
            },
        },
        variants: {
            size: {
                [TEXT_FIELD_SIZES.sm]: {
                    height: '2.25rem',
                    paddingInline: vars.space[8],
                },
                [TEXT_FIELD_SIZES.md]: {
                    height: '2.5rem',
                    paddingInline: vars.space[12],
                },
                [TEXT_FIELD_SIZES.lg]: {
                    height: '2.75rem',
                    paddingInline: vars.space[16],
                },
            },
            hasError: {
                true: {
                    borderColor: vars.color.danger.main,
                    selectors: {
                        '&:hover:not(:disabled)': {
                            borderColor: vars.color.danger.main,
                        },
                        '&:focus-visible': {
                            borderColor: vars.color.danger.main,
                            boxShadow: 'none',
                        },
                        '&[data-mouse-focus]:focus-visible': {
                            boxShadow: 'none',
                            borderColor: vars.color.danger.main,
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
            { variants: { size: TEXT_FIELD_SIZES.sm, hasStartIcon: true }, style: { paddingLeft: vars.space[32] } },
            { variants: { size: TEXT_FIELD_SIZES.md, hasStartIcon: true }, style: { paddingLeft: vars.space[32] } },
            { variants: { size: TEXT_FIELD_SIZES.lg, hasStartIcon: true }, style: { paddingLeft: vars.space[32] } },
            // End action: push text left (slot width 1.75rem + right offset 0.625rem)
            { variants: { size: TEXT_FIELD_SIZES.sm, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: TEXT_FIELD_SIZES.md, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: TEXT_FIELD_SIZES.lg, hasEndAction: true }, style: { paddingRight: '2.625rem' } },
        ],
        defaultVariants: {
            size: TEXT_FIELD_SIZES.md,
            hasError: false,
            hasStartIcon: false,
            hasEndAction: false,
        },
    }),
}
