import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const CALENDAR_CAPTION_STYLES = {
    monthCaption: style({
        paddingInline: vars.space.xxs,
    }),

    captionCenter: style({
        flex: 1,
    }),

    captionLabel: style({
        userSelect: 'none',
        paddingInline: vars.space.xs2,
    }),
}
