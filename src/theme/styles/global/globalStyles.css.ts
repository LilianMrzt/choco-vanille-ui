import { globalLayer, globalStyle } from '@vanilla-extract/css'

import {
    RESET_LAYER,
    THEME_TRANSITION_ATTRIBUTE,
    THEME_TRANSITION_DURATION_VAR,
} from '@theme/constants/index.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/*
 * Minimal global base styles for the kit. Provides predictable box-sizing, a
 * predictable zero-width borders, sensible default border colour, focus ring
 * colour, and themed body typography/background. Everything is driven by the
 * design tokens so the page restyles automatically when tokens are overridden
 * or the theme flips.
 *
 * All rules live in the low-specificity `auk.reset` layer so the consuming
 * project can override them without fighting specificity.
 */

const resetLayer = globalLayer(RESET_LAYER)

globalStyle('*, *::before, *::after', {
    '@layer': {
        [resetLayer]: {
            boxSizing: 'border-box',
            borderWidth: 0,
            borderStyle: 'solid',
            borderColor: vars.color.border.main,
            outlineColor: vars.color.focusRing,
        },
    },
})

globalStyle('html', {
    '@layer': {
        [resetLayer]: {
            // Advertise that both schemes are supported (themes form controls, scrollbars…).
            colorScheme: 'light dark',
        },
    },
})

globalStyle('body', {
    '@layer': {
        [resetLayer]: {
            margin: 0,
            backgroundColor: vars.color.background,
            color: vars.color.text.primary,
            fontFamily: vars.fontFamily.sans,
            fontSize: vars.fontSize.md,
            lineHeight: vars.lineHeight.normal,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
    },
})

globalStyle(
    `[${THEME_TRANSITION_ATTRIBUTE}], ` +
    `[${THEME_TRANSITION_ATTRIBUTE}] *, ` +
    `[${THEME_TRANSITION_ATTRIBUTE}] *::before, ` +
    `[${THEME_TRANSITION_ATTRIBUTE}] *::after`,
    {
        transitionProperty:
            'color, background-color, border-color, outline-color, box-shadow, fill, stroke',
        transitionDuration: `var(${THEME_TRANSITION_DURATION_VAR})`,
        transitionTimingFunction: 'linear',
    },
)
