import { style } from '@vanilla-extract/css'

import { DRAWER_ITEM_STYLES } from '@components/overlay/drawer/components/items/_shared'
import { vars } from '@theme/contract.css.ts'

const sectionContent = style({
    display: 'grid',
    gridTemplateRows: '0fr',
    overflow: 'hidden',
    transition: `grid-template-rows ${vars.duration.normal} ${vars.easing.standard}, padding-top ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="open"]': {
            gridTemplateRows: '1fr',
            paddingTop: vars.space.xs,
        },
    },
})

const chevron = style({
    transition: [
        `transform ${vars.duration.normal} ${vars.easing.standard}`,
        `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    ].join(', '),
    selectors: {
        '&[data-expanded="true"]': {
            transform: 'rotate(180deg)',
        },
        '&[data-state="closed"]': {
            opacity: 0,
        },
    },
})

export const DRAWER_SECTION_ITEM_STYLES = {
    ...DRAWER_ITEM_STYLES,
    sectionContent,
    chevron,
}
