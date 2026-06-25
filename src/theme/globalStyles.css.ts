import { globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/tokens.css.ts'

/*
 * Minimal global base styles for the kit. Mirrors the small reset the kit
 * previously relied on from Tailwind's preflight: predictable box-sizing,
 * sensible default border colour, focus ring colour, and themed body
 * typography/background. Everything is driven by the design tokens so the
 * page restyles automatically when tokens are overridden.
 */

globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
    borderColor: vars.color.border,
    outlineColor: vars.color.ring,
})

globalStyle('body', {
    margin: 0,
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.base,
    lineHeight: vars.lineHeight.normal,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
})
