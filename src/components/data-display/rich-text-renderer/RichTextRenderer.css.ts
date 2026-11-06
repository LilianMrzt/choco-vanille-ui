import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    color: vars.editorColors.neutral.dark,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize[14],
})

globalStyle(`${root} > *:first-child`, {
    marginTop: 0,
})

globalStyle(`${root} > *:last-child`, {
    marginBottom: 0,
})

globalStyle(`${root} ul, ${root} ol`, {
    marginBlock: vars.space[12],
    paddingInlineStart: vars.space[24],
})

globalStyle(`${root} li + li`, {
    marginTop: vars.space[4],
})

globalStyle(`${root} img`, {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
})

globalStyle(`${root} a`, {
    color: vars.color.link.main,
    textDecoration: 'underline',
    textUnderlineOffset: '0.15em',
})

globalStyle(`${root} a:hover`, {
    color: vars.color.link.hover,
})

globalStyle(`${root} blockquote`, {
    marginInline: 0,
    paddingInlineStart: vars.space[12],
    borderInlineStart: `3px solid ${vars.color.border.muted}`,
    color: vars.color.surface.mutedForeground,
})

globalStyle(`${root} pre`, {
    overflowX: 'auto',
    padding: vars.space[12],
    borderRadius: vars.radius[6],
    backgroundColor: vars.color.surface.muted,
})

/** Container class for scoped rich-text content styles. */
export const RICH_TEXT_RENDERER_STYLES = root
