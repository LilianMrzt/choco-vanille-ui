import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const MARKDOWN_RENDERER_STYLES = style({
    color: vars.color.foreground,
    fontFamily: vars.fontFamily.sans,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} > *:first-child`, {
    marginTop: 0,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} > *:last-child`, {
    marginBottom: 0,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} ul, ${MARKDOWN_RENDERER_STYLES} ol`, {
    marginBlock: vars.space.md,
    paddingInlineStart: vars.space.xl,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} li + li`, {
    marginTop: vars.space.xs,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} table`, {
    width: '100%',
    borderCollapse: 'collapse',
    marginBlock: vars.space.lg,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} th, ${MARKDOWN_RENDERER_STYLES} td`, {
    border: `1px solid ${vars.color.border}`,
    padding: vars.space.sm,
    textAlign: 'left',
    verticalAlign: 'top',
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} th`, {
    backgroundColor: vars.color.muted,
    fontWeight: vars.fontWeight.semibold,
})

globalStyle(`${MARKDOWN_RENDERER_STYLES} hr`, {
    border: 0,
    borderTop: `1px solid ${vars.color.border}`,
    marginBlock: vars.space.xl,
})
