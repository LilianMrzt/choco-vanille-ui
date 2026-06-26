import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'
/**
 * Root element — the visible box (applied on `Checkbox.Root`, a `<button>`).
 *
 * Dual-context design:
 *  - **Standalone** (`Checkbox` component): `data-state` / `data-disabled` live
 *    on this element itself → self-selectors `&[...]` apply.
 *  - **Dropdown** (`DropdownMenuCheckboxItem`): this class is re-used on the
 *    `<span>` indicator inside the item. The parent item carries `data-state` /
 *    `data-highlighted` / `data-disabled` → ancestor selectors `[...] &` apply.
 *
 * Both selector sets coexist without conflict:
 *  - In standalone context the span/button is `data-state` itself → only `&[...]`.
 *  - In dropdown context the span never has `data-state` → only `[...] &`.
 */
export const checkboxRootClass = style({
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    borderRadius: vars.radius.xs,
    border: `1.5px solid ${vars.color.input}`,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    transition: [
        `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        `border-color ${vars.duration.fast} ${vars.easing.standard}`,
        `color ${vars.duration.fast} ${vars.easing.standard}`,
        `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        /* ── Standalone: hover (only when NOT disabled) ─────────── */
        '&:not([data-disabled]):hover': {
            borderColor: vars.color.primaryHover,
            backgroundColor: vars.color.primarySubtle,
        },
        /* ── Standalone: active (only when NOT disabled) ────────── */
        '&:not([data-disabled]):active': {
            borderColor: vars.color.primaryActive,
            backgroundColor: vars.color.primarySubtleActive,
        },
        /* ── Standalone: focus ring ──────────────────────────────── */
        '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
        },
        /* ── Standalone: checked ─────────────────────────────────── */
        '&[data-state="checked"]': {
            backgroundColor: vars.color.primary,
            borderColor: vars.color.primary,
            color: vars.color.primaryForeground,
        },
        /* ── Standalone: checked + hover (only when NOT disabled) ── */
        '&[data-state="checked"]:not([data-disabled]):hover': {
            backgroundColor: vars.color.primaryHover,
            borderColor: vars.color.primaryHover,
        },
        /* ── Standalone: checked + active (only when NOT disabled) ── */
        '&[data-state="checked"]:not([data-disabled]):active': {
            backgroundColor: vars.color.primaryActive,
            borderColor: vars.color.primaryActive,
        },
        /* ── Standalone: disabled ────────────────────────────────── */
        '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 0.45,
        },
        /* ── Dropdown: highlighted parent ────────────────────────── */
        '[data-highlighted] &': {
            borderColor: vars.color.primaryHover,
            backgroundColor: vars.color.primarySubtle,
        },
        /* ── Dropdown: checked parent ────────────────────────────── */
        '[data-state="checked"] &': {
            backgroundColor: vars.color.primary,
            borderColor: vars.color.primary,
            color: vars.color.primaryForeground,
        },
        /* ── Dropdown: checked + highlighted parent ──────────────── */
        '[data-state="checked"][data-highlighted] &': {
            backgroundColor: vars.color.primaryHover,
            borderColor: vars.color.primaryHover,
        },
        /* ── Dropdown: disabled parent — neutralise hover on span ── */
        '[data-disabled] &': {
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
    },
})
/** Wrapper that aligns the control and its optional label side-by-side. */
export const checkboxWrapperClass = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space.sm,
})
/**
 * Indicator slot — keeps the check icon centred.
 * `color: inherit` picks up the `primaryForeground` set on the root when checked.
 */
export const checkboxIndicatorClass = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
})
/** Typography label associated with the checkbox control. */
export const checkboxLabelClass = style({
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        /* Mirrors disabled opacity when the paired checkbox is disabled */
        '[data-disabled] ~ &': {
            cursor: 'not-allowed',
            opacity: 0.45,
        },
    },
})
globalStyle(`${checkboxRootClass} svg`, {
    width: '0.625rem',
    height: '0.625rem',
    pointerEvents: 'none',
})
