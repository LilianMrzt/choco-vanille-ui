import { globalStyle, style } from '@vanilla-extract/css'

export const TABLE_BODY_STYLES = {
    root: style({}),
}

globalStyle(`${TABLE_BODY_STYLES.root} tr:last-child`, {
    borderBottom: 'none',
})
