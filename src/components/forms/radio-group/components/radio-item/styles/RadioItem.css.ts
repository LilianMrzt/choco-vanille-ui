import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * RadioGroup.Item root — the circular button (applied on `RadioGroup.Item`, a `<button>`).
 *
 * Dual-context design — mirrors `checkboxRootClass`:
 *  - **Standalone** (`RadioItem` component): self-selectors `&[...]` apply.
 *  - **Dropdown** (`DropdownMenuRadioItem`): this class is re-used on the
 *    `<span>` indicator. Ancestor selectors `[...] &` apply.
 */
export const RADIO_ITEM_STYLES = {
    root: style({
        flexShrink: 0,
        width: '1rem',
        height: '1rem',
        borderRadius: vars.radius.full,
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
            /* ── Standalone: hover (only when NOT disabled) ─────────── */
            '&:not([data-disabled]):hover': {
                borderColor: vars.color.primary.hover,
                backgroundColor: vars.color.primary.subtle,
            },
            /* ── Standalone: active (only when NOT disabled) ────────── */
            '&:not([data-disabled]):active': {
                borderColor: vars.color.primary.pressed,
                backgroundColor: vars.color.primary.subtlePressed,
            },
            /* ── Standalone: focus ring ──────────────────────────────── */
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            /* ── Standalone: checked ─────────────────────────────────── */
            '&[data-checked]': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            /* ── Standalone: checked + hover (only when NOT disabled) ── */
            '&[data-checked]:not([data-disabled]):hover': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* ── Standalone: checked + active (only when NOT disabled) ── */
            '&[data-checked]:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.pressed,
                borderColor: vars.color.primary.pressed,
            },
            /* ── Standalone: disabled ────────────────────────────────── */
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
            /* ── Dropdown: highlighted parent ────────────────────────── */
            '[data-highlighted] &': {
                borderColor: vars.color.primary.hover,
                backgroundColor: vars.color.primary.subtle,
            },
            /* ── Dropdown: checked parent ────────────────────────────── */
            '[data-checked] &': {
                backgroundColor: vars.color.primary.main,
                borderColor: vars.color.primary.main,
                color: vars.color.primary.foreground,
            },
            /* ── Dropdown: checked + highlighted parent ──────────────── */
            '[data-checked][data-highlighted] &': {
                backgroundColor: vars.color.primary.hover,
                borderColor: vars.color.primary.hover,
            },
            /* ── Dropdown: disabled parent — neutralise hover on span ── */
            '[data-disabled] &': {
                cursor: 'not-allowed',
                pointerEvents: 'none',
            },
        },
    }),

    /**
     * Indicator slot inside the circle.
     * `color: inherit` picks up `primaryForeground` from the checked root.
     */
    indicator: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
    }),

    /** Filled dot shown inside the checked dropdown radio. Inherits the root color. */
    dot: style({
        width: '0.375rem',
        height: '0.375rem',
        borderRadius: vars.radius.full,
        backgroundColor: 'currentColor',
    }),

    /** Typography label associated with the radio button. */
    label: style({
        selectors: {
            '[data-disabled] ~ &': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}
