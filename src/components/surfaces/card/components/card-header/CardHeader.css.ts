import { style } from '@vanilla-extract/css'

const content = style({
    flex: '1 1 0%',
    minWidth: 0,
})

const actions = style({
    flexShrink: 0,
})

/** Customizable styles for the card header content and actions. */
export const CARD_HEADER_STYLES = {
    content,
    actions,
}
