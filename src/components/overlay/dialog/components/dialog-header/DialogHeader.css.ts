import { style } from '@vanilla-extract/css'

const content = style({
    flex: '1 1 0%',
    minWidth: 0,
})

const actions = style({
    flexShrink: 0,
})

export const DIALOG_HEADER_STYLES = {
    content,
    actions,
}
