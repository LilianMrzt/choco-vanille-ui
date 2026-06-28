import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

// ── Header shell ──────────────────────────────────────────────────────────────
export const cardHeaderClass = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: vars.space.md,
    padding: vars.space.lg,
    paddingBottom: vars.space.none,
})

// ── Title + description column ────────────────────────────────────────────────
export const cardHeaderContentClass = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.xs,
    flex: '1 1 0%',
    minWidth: 0,
})

export const cardTitleClass = style({
    margin: 0,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.lg,
    fontWeight: vars.fontWeight.semibold,
    lineHeight: vars.lineHeight.tight,
    color: vars.color.cardForeground,
})

export const cardDescriptionClass = style({
    margin: 0,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.mutedForeground,
})

// ── Actions slot ──────────────────────────────────────────────────────────────
export const cardHeaderActionsClass = style({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.xs,
})
