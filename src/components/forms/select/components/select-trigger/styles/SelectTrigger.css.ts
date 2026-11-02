import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Chevron slot for the trigger.
 *
 * Unlike TextField's end-action (which holds clickable IconButtons and needs a
 * wide hit area), the Select chevron is decorative, so the slot is sized to the
 * icon and sits close to the right edge.
 */
export const SELECT_TRIGGER_END_ICON = style({
    position: 'absolute',
    right: '0.5rem',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 'auto',
    pointerEvents: 'none',
})

/**
 * Trigger styled to look like a TextField input.
 *
 * Base UI renders it as a `<button>`; we reset button defaults and apply the
 * same sizing, border, focus ring and disabled treatment as TextField.
 * The chevron is rendered in an end-action slot identical to TextField's.
 */
export const SELECT_TRIGGER_STYLES = {
    recipe: recipe({
        base: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.normal,
            borderRadius: vars.radius.xs,
            border: `1px solid ${vars.color.border}`,
            backgroundColor: vars.color.card,
            color: vars.color.foreground,
            outline: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            transition: [
                `border-color ${vars.duration.fast} ${vars.easing.standard}`,
                `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
                `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            ].join(', '),
            selectors: {
                // Open state: primary border, mirrors TextField's mouse-focus appearance.
                '&[data-popup-open]': {
                    borderColor: vars.color.primary,
                },
                '&:focus-visible': {
                    outline: 'none',
                    borderColor: vars.color.primary,
                    boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
                },
                '&[data-mouse-focus]:focus-visible': {
                    boxShadow: 'none',
                    borderColor: vars.color.primary,
                },
                '&:disabled, &[data-disabled]': {
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
                        '&:hover:not(:disabled):not([data-disabled])': {
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
            },
            hasStartIcon: {
                true: {},
            },
            hasEndIcon: {
                true: {},
            },
        },
        compoundVariants: [
            // Start icon: push text right
            { variants: { hasStartIcon: true }, style: { paddingLeft: '1.75rem' } },
            // End icon: push text left (chevron slot ~1rem + right offset 0.5rem)
            { variants: { hasEndIcon: true }, style: { paddingRight: '1.75rem' } },
        ],
        defaultVariants: {
            size: 'md',
            hasError: false,
            hasStartIcon: false,
            hasEndIcon: true,
        },
    }),
}

export type SelectTriggerRecipeVariants = NonNullable<RecipeVariants<typeof SELECT_TRIGGER_STYLES.recipe>>
