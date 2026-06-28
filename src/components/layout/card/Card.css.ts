import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const cardClass = style({
    backgroundColor: vars.color.card,
    color: vars.color.cardForeground,
    borderRadius: vars.radius.lg,
    border: `1px solid ${vars.color.border}`,
    boxShadow: vars.shadow.sm,
    overflow: 'hidden',
})

export const cardHeaderClass = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.xs,
    padding: vars.space.lg,
    paddingBottom: vars.space.none,
})

export const cardTitleClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.lg,
    fontWeight: vars.fontWeight.semibold,
    lineHeight: vars.lineHeight.tight,
    color: vars.color.cardForeground,
})

export const cardDescriptionClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.mutedForeground,
})

export const cardBodyClass = style({
    padding: vars.space.lg,
})

export const cardFooterClass = style({
    display: 'flex',
    alignItems: 'center',
    padding: vars.space.lg,
    paddingTop: vars.space.none,
})
