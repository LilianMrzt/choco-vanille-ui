import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALENDAR_CAPTION_STYLES = {
    monthCaption: style({
        width: '100%',
    }),

    captionCenter: style({
        flex: 1,
    }),

    captionLabel: style({
        userSelect: 'none',
        paddingInline: vars.space[6],
    }),
}
