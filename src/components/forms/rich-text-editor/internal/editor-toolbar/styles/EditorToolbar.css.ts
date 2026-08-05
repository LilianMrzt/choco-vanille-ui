import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const EDITOR_TOOLBAR_STYLES = {
    root: style({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0',
        padding: vars.space.xs,
        marginBottom: `calc(-1 * ${vars.space.xs})`,
        border: `1px solid ${vars.color.input}`,
        borderBottom: 'none',
        borderTopLeftRadius: vars.radius.sm,
        borderTopRightRadius: vars.radius.sm,
        backgroundColor: vars.color.card,
    }),
    group: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.xs,
        paddingInline: vars.space.xs,
    }),
    separator: style({
        width: '1px',
        alignSelf: 'stretch',
        marginBlock: vars.space.xs,
        backgroundColor: vars.color.border,
    }),
    colorPicker: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1.75rem)',
        gap: vars.space.xs,
    }),
    colorSwatch: style({
        width: '1.75rem',
        height: '1.75rem',
        border: `2px solid ${vars.color.card}`,
        borderRadius: vars.radius.sm,
        cursor: 'pointer',
        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.ring}`,
                outlineOffset: '2px',
            },
            '&[data-selected="true"]': {
                boxShadow: `0 0 0 2px ${vars.color.foreground}`,
            },
        },
    }),
}
