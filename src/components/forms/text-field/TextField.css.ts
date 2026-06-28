import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

// ── Outer wrapper (label + field + helper) ────────────────────────────────────
export const textFieldWrapperClass = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.xs,
    width: '100%',
})

// ── Inner field row (input + absolutely-positioned slots) ─────────────────────
export const textFieldFieldClass = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
})

// ── Start icon slot ───────────────────────────────────────────────────────────
export const textFieldStartIconClass = style({
    position: 'absolute',
    left: vars.space.sm,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.mutedForeground,
})

// ── End action slot ───────────────────────────────────────────────────────────
//
// Button size is forced to 1.75rem (see globalStyle below).
// Right offset = (fieldHeight_md − buttonHeight) / 2 = (2.5rem − 1.75rem) / 2 = 0.375rem
// → same gap on top, bottom AND right for the md size (most common).
export const textFieldEndActionClass = style({
    position: 'absolute',
    right: '0.375rem',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
})

/** Force the IconButton inside the end-action slot to a compact 1.75rem square. */
globalStyle(`${textFieldEndActionClass} button`, {
    height: '1.75rem',
    width: '1.75rem',
})

// ── Label ─────────────────────────────────────────────────────────────────────
export const textFieldLabelClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.foreground,
    userSelect: 'none',
    selectors: {
        '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 0.45,
        },
    },
})

// ── Input ─────────────────────────────────────────────────────────────────────
export const textFieldInputRecipe = recipe({
    base: {
        width: '100%',
        fontFamily: vars.fontFamily.sans,
        lineHeight: vars.lineHeight.normal,
        borderRadius: vars.radius.sm,
        border: `1px solid ${vars.color.input}`,
        // White background by default (card token = white surface in light/dark themes).
        // Override via the `style` prop: `<TextField style={{ backgroundColor: '…' }} />`
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
            // No primary color on hover — only a subtle border signal.
            '&:hover:not(:disabled)': {
                borderColor: vars.color.ring,
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
                fontSize: vars.fontSize.base,
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
        // ── Start icon: push text right ───────────────────────────────────────
        { variants: { size: 'sm', hasStartIcon: true }, style: { paddingLeft: '2.25rem' } },
        { variants: { size: 'md', hasStartIcon: true }, style: { paddingLeft: '2.5rem' } },
        { variants: { size: 'lg', hasStartIcon: true }, style: { paddingLeft: '2.75rem' } },
        // ── End action: push text left ────────────────────────────────────────
        // button (1.75rem) + right-offset (0.375rem) + inner gap (0.25rem) ≈ 2.375rem
        { variants: { size: 'sm', hasEndAction: true }, style: { paddingRight: '2.375rem' } },
        { variants: { size: 'md', hasEndAction: true }, style: { paddingRight: '2.375rem' } },
        { variants: { size: 'lg', hasEndAction: true }, style: { paddingRight: '2.375rem' } },
    ],
    defaultVariants: {
        size: 'md',
        hasError: false,
        hasStartIcon: false,
        hasEndAction: false,
    },
})

// ── Helper / Error text ───────────────────────────────────────────────────────
export const textFieldHelperClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.mutedForeground,
})

export const textFieldErrorClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.destructive,
})

export type TextFieldInputRecipeVariants = NonNullable<RecipeVariants<typeof textFieldInputRecipe>>
