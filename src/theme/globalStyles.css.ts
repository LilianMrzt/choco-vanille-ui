import { globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/*
 * Minimal global base styles for the kit. Provides predictable box-sizing, a
 * sensible default border colour, focus ring colour, and themed body
 * typography/background. Everything is driven by the design tokens so the page
 * restyles automatically when tokens are overridden or the theme flips.
 */

globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
    borderColor: vars.color.border,
    outlineColor: vars.color.ring,
})

globalStyle('html', {
    // Advertise that both schemes are supported (themes form controls, scrollbars…).
    colorScheme: 'light dark',
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
