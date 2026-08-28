import { style } from '@vanilla-extract/css'

export const PANEL_HEADER_STYLES = {
    content: style({
        flex: '1 1 0%',
        minWidth: 0,
    }),
    actions: style({
        flexShrink: 0,
        marginLeft: 'auto',
    }),
}
