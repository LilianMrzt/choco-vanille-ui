import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TEXT_COLOR_MENU_STYLES = {
    colorPicker: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xs,
    }),
    paletteGrid: style({
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1.75rem)',
        gap: vars.space.xs,
    }),
    paletteColumn: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xs,
    }),
    colorSwatch: style({
        width: '1.75rem',
        height: '1.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        border: `2px solid ${vars.color.card}`,
        borderRadius: vars.radius.xs,
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
    colorCheck: style({ color: 'white', pointerEvents: 'none' }),
    selectedColor: style({
        display: 'block',
        width: '0.875rem',
        height: '0.875rem',
        borderRadius: '50%',
        border: `1px solid ${vars.color.border}`,
    }),
}
