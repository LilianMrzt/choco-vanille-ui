import { style } from '@vanilla-extract/css'

import { DRAWER_ITEM_STYLES } from '@components/overlay/drawer/components/items/_shared'
import { vars } from '@theme/contract.css.ts'

const sectionContent = style({
    overflow: 'hidden',
    transition: `grid-template-rows ${vars.duration.normal} ${vars.easing.standard}, padding-top ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="open"]': {
            overflow: 'visible',
        },
    },
})

export const DRAWER_SECTION_ITEM_STYLES = {
    ...DRAWER_ITEM_STYLES,
    recipe: DRAWER_ITEM_STYLES.recipe,
    sectionContent,
}
