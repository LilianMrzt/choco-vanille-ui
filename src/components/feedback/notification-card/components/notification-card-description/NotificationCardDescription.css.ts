import { style } from '@vanilla-extract/css'

const description = style({
    display: 'block',
    minWidth: 0,
    lineHeight: 1.6,
    overflowWrap: 'anywhere',
})

export const NOTIFICATION_CARD_DESCRIPTION_STYLES = {
    description,
}
