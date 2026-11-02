import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const RICH_TEXT_RENDERER_STYLES = style({
    color: vars.editorColors.neutral.dark,
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

globalStyle(`${RICH_TEXT_RENDERER_STYLES} img`, {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} a`, {
    color: vars.color.link,
    textDecoration: 'underline',
    textUnderlineOffset: '0.15em',
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} a:hover`, {
    color: vars.color.linkHover,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} blockquote`, {
    marginInline: 0,
    paddingInlineStart: vars.space.md,
    borderInlineStart: `3px solid ${vars.color.border}`,
    color: vars.color.mutedForeground,
})

globalStyle(`${RICH_TEXT_RENDERER_STYLES} pre`, {
    overflowX: 'auto',
    padding: vars.space.md,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.color.muted,
})
