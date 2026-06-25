import { palette } from '@theme/tokens/palette.ts'

/*
 * Light theme — semantic color tokens.
 * Docs → docs/docs/theme/tokens.md · docs/docs/theme/overview.md
 */
export const lightColors = {
    /* ── Base surfaces & text ─────────────────────────────────────────────── */
    background: palette.neutral[100],
    foreground: palette.neutral[950],

    /* ── Elevated surfaces ────────────────────────────────────────────────── */
    card: palette.neutral[0],
    cardForeground: palette.neutral[950],
    popover: palette.neutral[0],
    popoverForeground: palette.neutral[950],

    /* ── Brand / primary intent ───────────────────────────────────────────── */
    primary: palette.brand[600],
    primaryForeground: palette.neutral[0],
    primaryHover: palette.brand[700],
    primaryActive: palette.brand[800],
    /** Subtle tint — for use on `background` or `card` surfaces only. */
    primarySubtle: palette.brand[50],
    primarySubtleForeground: palette.brand[700],

    /* ── Secondary intent (low-emphasis neutral fill) ─────────────────────── */
    secondary: palette.neutral[100],
    secondaryForeground: palette.neutral[900],
    secondaryHover: palette.neutral[200],
    secondaryActive: palette.neutral[300],

    /* ── Muted (quiet backgrounds & secondary text) ───────────────────────── */
    muted: palette.neutral[100],
    mutedForeground: palette.neutral[500],

    /* ── Accent (hover wash on ghost/outline controls) ────────────────────── */
    accent: palette.neutral[100],
    accentForeground: palette.neutral[900],

    /* ── Status: success ──────────────────────────────────────────────────── */
    success: palette.green[600],
    successForeground: palette.neutral[0],
    successSubtle: palette.green[50],
    successSubtleForeground: palette.green[700],

    /* ── Status: warning ──────────────────────────────────────────────────── */
    warning: palette.amber[500],
    warningForeground: palette.neutral[950],
    warningSubtle: palette.amber[50],
    warningSubtleForeground: palette.amber[700],

    /* ── Status: info ─────────────────────────────────────────────────────── */
    info: palette.blue[600],
    infoForeground: palette.neutral[0],
    infoSubtle: palette.blue[50],
    infoSubtleForeground: palette.blue[700],

    /* ── Status: destructive / danger ─────────────────────────────────────── */
    destructive: palette.red[600],
    destructiveForeground: palette.neutral[0],
    destructiveHover: palette.red[700],
    destructiveActive: palette.red[800],
    destructiveSubtle: palette.red[50],
    destructiveSubtleForeground: palette.red[700],

    /* ── Lines, fields & focus ────────────────────────────────────────────── */
    border: palette.neutral[200],
    input: palette.neutral[300],
    ring: palette.brand[600],

    /* ── Highlight (Typography <mark>) ────────────────────────────────────── */
    highlight: palette.amber[200],
    highlightForeground: palette.amber[900],
} as const

export type LightColors = typeof lightColors
