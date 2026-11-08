import { style } from '@vanilla-extract/css'

import { DRAWER_ITEM_STYLES } from '@components/overlay/drawer/components/items/_shared'
import { vars } from '@theme/styles/contract/contract.css.ts'

const sectionContent = style({
    overflow: 'hidden',
    transition: `grid-template-rows ${vars.duration.normal} ${vars.easing.standard}, padding-top ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="open"]': {
            overflow: 'visible',
        },
    },
})

const sectionInner = style({
    transition: `padding-bottom ${vars.duration.normal} ${vars.easing.standard}`,
})

const sectionSeparator = style({
    opacity: 0,
    transition: [
        `margin-left ${vars.duration.normal} ${vars.easing.standard}`,
        `margin-right ${vars.duration.normal} ${vars.easing.standard}`,
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        '&[data-state="open"]': {
            opacity: 1,
        },
    },
})

export const DRAWER_COLLAPSIBLE_STYLES = {
    ...DRAWER_ITEM_STYLES,
    recipe: DRAWER_ITEM_STYLES.recipe,
    sectionContent,
    sectionInner,
    sectionSeparator,
}
