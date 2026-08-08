import { style } from '@vanilla-extract/css'
import { vars } from '@theme'

export const TEXT_AREA_LABEL_STYLES = {
    root: style({
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.md,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.normal,
        color: vars.color.foreground,
        userSelect: 'none',
        selectors: {
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}
