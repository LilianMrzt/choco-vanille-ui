import { palette } from '@theme/tokens/palette.ts'

import { type LightColors } from '@theme/colors/light.ts'

/*
 * Dark theme — semantic color tokens.
 *
 * Typed as `Record<keyof LightColors, string>` so TypeScript enforces that
 * every role defined in the light theme has a dark counterpart — the contract
 * is exhaustive and the two themes stay in sync automatically.
 *
 * Design rationale
 * ─────────────────
 * • Surfaces use near-black neutrals; text uses near-white.
 * • Brand shifts up the ramp (500 instead of 600) for legibility against dark.
 * • Hover/active directions are inverted: lighter = active (not darker).
 * • Status subtle pairs use the darkest ramp step (950) as the background and
 *   a mid-ramp step (300) as the text to stay readable without blowing out.
 * • Shadows are deeper (higher opacity) to compensate for the lack of natural
 *   contrast between raised surfaces and the dark page.
 */
export const darkColors: Record<keyof LightColors, string> = {
    /* ── Base surfaces & text ─────────────────────────────────────────────── */
    background: palette.neutral[950],
    foreground: palette.neutral[100],

    /* ── Elevated surfaces — a hair lighter than the page for depth ───────── */
    card: palette.neutral[900],
    cardForeground: palette.neutral[100],
    popover: palette.neutral[900],
    popoverForeground: palette.neutral[100],

    /* ── Brand / primary intent — shifted up the ramp for dark contrast ───── */
    primary: palette.brand[500],
    primaryForeground: palette.neutral[950],
    primaryHover: palette.brand[400],
    primaryActive: palette.brand[300],

    /* ── Secondary intent ─────────────────────────────────────────────────── */
    secondary: palette.neutral[800],
    secondaryForeground: palette.neutral[100],
    secondaryHover: palette.neutral[700],
    secondaryActive: palette.neutral[600],

    /* ── Muted ────────────────────────────────────────────────────────────── */
    muted: palette.neutral[800],
    mutedForeground: palette.neutral[400],

    /* ── Accent ───────────────────────────────────────────────────────────── */
    accent: palette.neutral[800],
    accentForeground: palette.neutral[100],

    /* ── Status: success ──────────────────────────────────────────────────── */
    success: palette.green[500],
    successForeground: palette.neutral[950],
    successSubtle: palette.green[950],
    successSubtleForeground: palette.green[300],

    /* ── Status: warning ──────────────────────────────────────────────────── */
    warning: palette.amber[400],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[950],
    warningSubtleForeground: palette.amber[300],

    /* ── Status: info ─────────────────────────────────────────────────────── */
    info: palette.blue[500],
    infoForeground: palette.neutral[950],
    infoSubtle: palette.blue[950],
    infoSubtleForeground: palette.blue[300],

    /* ── Status: destructive / danger ─────────────────────────────────────── */
    destructive: palette.red[500],
    destructiveForeground: palette.neutral[950],
    destructiveHover: palette.red[400],
    destructiveActive: palette.red[300],
    destructiveSubtle: palette.red[950],
    destructiveSubtleForeground: palette.red[300],

    /* ── Lines, fields & focus ────────────────────────────────────────────── */
    border: palette.neutral[800],
    input: palette.neutral[700],
    ring: palette.brand[500],

    /* ── Highlight ────────────────────────────────────────────────────────── */
    highlight: palette.amber[400],
    highlightForeground: palette.neutral[950],
}
