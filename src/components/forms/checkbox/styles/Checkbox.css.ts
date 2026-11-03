import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'
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
export const CHECKBOX_STYLES = {
    root: style({
        flexShrink: 0,
        width: '1rem',
        height: '1rem',
        borderRadius: vars.radius.xs,
        border: `1.5px solid ${vars.color.border.main}`,
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
            /* Standalone: hover (only when NOT disabled) */
            '&:not([data-disabled]):hover': {
                borderColor: vars.color.primary.hover,
                backgroundColor: vars.color.primary.subtle,
            },
            /* Standalone: active (only when NOT disabled) */
            '&:not([data-disabled]):active': {
                borderColor: vars.color.primary.pressed,
                backgroundColor: vars.color.primary.subtlePressed,
            },
            /* Standalone: focus ring */
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            /* Standalone: checked */
            '&[data-checked]': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            /* Standalone: checked + hover (only when NOT disabled) */
            '&[data-checked]:not([data-disabled]):hover': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* Standalone: checked + active (only when NOT disabled) */
            '&[data-checked]:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.pressed,
                borderColor: vars.color.primary.pressed,
            },
            /* Standalone: indeterminate */
            '&[data-indeterminate]': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            /* Standalone: indeterminate + hover (only when NOT disabled) */
            '&[data-indeterminate]:not([data-disabled]):hover': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* Standalone: indeterminate + active (only when NOT disabled) */
            '&[data-indeterminate]:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.pressed,
                borderColor: vars.color.primary.pressed,
            },
            /* Standalone: disabled */
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
            /* Dropdown: highlighted parent */
            '[data-highlighted] &': {
                borderColor: vars.color.primary.hover,
                backgroundColor: vars.color.primary.subtle,
            },
            /* Dropdown: checked parent */
            '[data-checked] &': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            /* Dropdown: checked + highlighted parent */
            '[data-checked][data-highlighted] &': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* Dropdown: indeterminate parent */
            '[data-indeterminate] &': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            '[data-indeterminate][data-highlighted] &': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* Dropdown: disabled parent — neutralize hover on span */
            '[data-disabled] &': {
                cursor: 'not-allowed',
                pointerEvents: 'none',
            },
        },
    }),
    /**
     * Indicator slot — keeps the check icon centred.
     * `color: inherit` picks up the `primaryForeground` set on the root when checked.
     */
    indicator: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
    }),
    checkIcon: style({
        selectors: {
            '[data-indeterminate] &': {
                display: 'none',
            },
        },
    }),
    indeterminateIcon: style({
        display: 'none',
        selectors: {
            '[data-indeterminate] &': {
                display: 'block',
            },
        },
    }),
    /** Typography label associated with the checkbox control. */
    label: style({
        selectors: {
            /* Mirrors disabled opacity when the paired checkbox is disabled */
            '[data-disabled] ~ &': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}

globalStyle(`${CHECKBOX_STYLES.root} svg`, {
    width: '0.625rem',
    height: '0.625rem',
    pointerEvents: 'none',
})
