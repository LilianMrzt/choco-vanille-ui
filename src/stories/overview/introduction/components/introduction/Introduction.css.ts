import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const root = style({
    background: vars.color.surface.main,
    borderRadius: vars.radius[14],
    color: vars.color.text.primary,
    fontFamily: vars.fontFamily.sans,
    maxWidth: '70rem',
    marginInline: 'auto',
    padding: 'clamp(1rem, 3vw, 2rem)',
})

const header = style({
    marginBottom: vars.space[48],
})

const titleRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: vars.space[12],
    marginBottom: vars.space[12],
})

const title = style({
    selectors: {
        [`${root}${root} &`]: {
            color: vars.color.text.primary,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: vars.fontWeight.bold,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            overflowWrap: 'anywhere',
            border: 0,
            padding: 0,
            margin: 0,
        },
    },
})

const description = style({
    selectors: {
        [`${root}${root} &`]: {
            color: vars.color.text.secondary,
            fontSize: vars.fontSize[16],
            lineHeight: 1.6,
            maxWidth: '58ch',
            margin: 0,
        },
    },
})

const section = style({
    marginBottom: vars.space[48],
})

const sectionTitle = style({
    selectors: {
        [`${root}${root} &`]: {
            color: vars.color.text.primary,
            fontSize: vars.fontSize[20],
            fontWeight: vars.fontWeight.semibold,
            border: 0,
            padding: 0,
            margin: `0 0 ${vars.space[16]}`,
        },
    },
})

const category = style({
    display: 'grid',
    gap: vars.space[12],
    borderTop: `1px solid ${vars.color.border.muted}`,
    paddingBlock: vars.space[20],
    '@media': {
        'screen and (min-width: 640px)': {
            gridTemplateColumns: '11rem minmax(0, 1fr)',
            gap: vars.space[24],
        },
    },
})

const categoryTitle = style({
    selectors: {
        [`${root}${root} &`]: {
            color: vars.color.text.primary,
            fontSize: vars.fontSize[14],
            fontWeight: vars.fontWeight.semibold,
            border: 0,
            padding: 0,
            margin: 0,
        },
    },
})

const links = style({
    selectors: {
        [`${root}${root} &`]: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: vars.space[8],
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
    },
})

const item = style({
    selectors: {
        [`${root}${root} &`]: {
            display: 'block',
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
    },
})

const link = style({
    selectors: {
        [`${root}${root} &`]: {
            display: 'block',
            background: vars.color.neutral.main,
            color: vars.color.neutral.foreground,
            borderRadius: vars.radius[6],
            fontSize: vars.fontSize[14],
            fontWeight: vars.fontWeight.medium,
            lineHeight: 1.4,
            overflowWrap: 'anywhere',
            padding: `${vars.space[8]} ${vars.space[12]}`,
            textDecoration: 'none',
        },
        [`${root}${root} &:hover`]: {
            background: vars.color.primary.subtleHover,
            color: vars.color.primary.subtleForeground,
            textDecoration: 'none',
        },
        [`${root}${root} &:active`]: {
            background: vars.color.primary.subtlePressed,
        },
        [`${root}${root} &:focus-visible`]: {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: '2px',
        },
    },
})

export const INTRODUCTION_STYLES = {
    root,
    header,
    titleRow,
    title,
    description,
    section,
    sectionTitle,
    category,
    categoryTitle,
    links,
    item,
    link,
}
