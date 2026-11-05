import { globalStyle, style } from '@vanilla-extract/css'

const root = style({})

globalStyle(`${root} tr:last-child`, {
    borderBottom: 'none',
})

/** Body customization class; suppresses the last row's bottom divider. */
export const TABLE_BODY_STYLES = {
    root,
}
