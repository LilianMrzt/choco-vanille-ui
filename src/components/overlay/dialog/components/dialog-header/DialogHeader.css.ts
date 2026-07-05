import { style } from '@vanilla-extract/css'

export const DIALOG_HEADER_STYLES = {
    content: style({
        flex: '1 1 0%',
        minWidth: 0,
    }),
    actions: style({
        flexShrink: 0,
    }),
}
