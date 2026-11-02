import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const DATE_PICKER_STYLES = {
    /** Positions the end action (calendar trigger) over the date field. */
    root: style({
        position: 'relative',
        width: '100%',
    }),

    /** The bordered box around the segments. Border and size come from the TextField recipe. */
    input: style({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        cursor: 'text',
        minWidth: 0,
        overflow: 'hidden',
        selectors: {
            '&[data-focus-within]': {
                borderColor: vars.color.primary,
            },
            '&[data-invalid][data-focus-within]': {
                borderColor: vars.color.destructive,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
                backgroundColor: vars.color.muted,
            },
        },
    }),

    /** A single editable date segment (day, month, year) or a literal separator. */
    segment: style({
        display: 'inline-block',
        flex: '0 0 auto',
        minWidth: '2ch',
        padding: 0,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        outline: 'none',
        caretColor: 'transparent',
        selectors: {
            '&[data-type="year"]': {
                minWidth: '4ch',
            },
            '&[data-type="literal"]': {
                minWidth: 'auto',
                color: vars.color.textTertiary,
            },
            '&[data-placeholder]': {
                color: vars.color.textTertiary,
            },
            '&[data-focused]': {
                backgroundColor: vars.color.muted,
                borderRadius: vars.radius.xs,
            },
        },
    }),

    /** Removes the calendar border when rendered inside the date picker popover. */
    calendar: style({
        selectors: {
            '&&': {
                border: 'none',
            },
        },
    }),
}
