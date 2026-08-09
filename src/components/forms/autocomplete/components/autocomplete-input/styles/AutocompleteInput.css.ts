import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

/**
 * Input styled to look like a TextField input.
 *
 * Base UI renders it as an `<input>`; we apply the same sizing, border, focus
 * ring and disabled treatment as TextField.
 */
export const AUTOCOMPLETE_INPUT_STYLES = {
    recipe: recipe({
        base: {
            width: '100%',
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.normal,
            borderRadius: vars.radius.sm,
            border: `1px solid ${vars.color.border}`,
            backgroundColor: vars.color.card,
            color: vars.color.foreground,
            outline: 'none',
            transition: [
                `border-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                '&::placeholder': {
                    color: vars.color.mutedForeground,
                },
                // Open state: primary border, mirrors TextField's mouse-focus appearance.
                '&[data-popup-open]': {
                    borderColor: vars.color.primary,
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
                sm: {
                    height: '2.25rem',
                    paddingInline: vars.space.sm,
                    fontSize: vars.fontSize.sm,
                },
                md: {
                    height: '2.5rem',
                    paddingInline: vars.space.md,
                    fontSize: vars.fontSize.sm,
                },
                lg: {
                    height: '2.75rem',
                    paddingInline: vars.space.lg,
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
                        '&[data-popup-open]': {
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
            { variants: { size: 'sm', hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            { variants: { size: 'md', hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            { variants: { size: 'lg', hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            // End action: push text left (slot width 1.75rem + right offset 0.625rem)
            { variants: { size: 'sm', hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: 'md', hasEndAction: true }, style: { paddingRight: '2.625rem' } },
            { variants: { size: 'lg', hasEndAction: true }, style: { paddingRight: '2.625rem' } },
        ],
        defaultVariants: {
            size: 'md',
            hasError: false,
            hasStartIcon: false,
            hasEndAction: false,
        },
    }),
}

export type AutocompleteInputRecipeVariants = NonNullable<RecipeVariants<typeof AUTOCOMPLETE_INPUT_STYLES.recipe>>
