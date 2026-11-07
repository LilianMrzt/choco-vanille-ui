import { style } from '@vanilla-extract/css'

const title = style({
    flex: 1,
    minWidth: 0,
    lineHeight: 1.5,
    overflowWrap: 'anywhere',
})

export const NOTIFICATION_CARD_TITLE_STYLES = {
    title,
}
