import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const RICH_TEXT_RENDERER_STYLES = style({
    color: vars.color.foreground,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} > *:first-child`, {
    marginTop: 0,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} > *:last-child`, {
    marginBottom: 0,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} ul, ${RICH_TEXT_RENDERER_STYLES} ol`, {
    marginBlock: vars.space.md,
    paddingInlineStart: vars.space.xl,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} li + li`, {
    marginTop: vars.space.xs,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} a`, {
    color: vars.color.link,
    textDecoration: 'underline',
    textUnderlineOffset: '0.15em',
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} a:hover`, {
    color: vars.color.linkHover,
})
