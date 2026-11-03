import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const root = style({
    padding: 'clamp(1rem, 4vw, 3rem)',
    overflowWrap: 'anywhere',
    fontFamily: vars.fontFamily.sans,
})

const content = style({
    marginInline: 'auto',
    width: '100%',
    maxWidth: '80rem',
})

export const REFERENCE_PAGE_STYLES = {
    root,
    content,
}
