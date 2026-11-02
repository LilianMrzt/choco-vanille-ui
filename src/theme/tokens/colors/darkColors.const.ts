import { palette } from '@theme/tokens/colors/palette.const.ts'

import type { ThemeColors, ThemeEditorColors } from '@theme/tokens/colors/types/index.ts'

/**
 * Dark-theme semantic UI colors with the same token keys as `lightColors`.
 * Surface, foreground, and interaction-state values are adapted to dark
 * backgrounds; matching foregrounds pair with each family's treatment.
 *
 * These raw values populate `darkTheme.color`. Use `vars.color.<token>` in
 * component styles to resolve the active theme rather than hardcoding a mode.
 * Rich-text palettes are defined separately in `darkEditorColors`.
 */
export const darkColors = {
    currentColor: 'currentColor',
    transparent: 'transparent',

    /* Base surfaces & text  */
    background: palette.neutral[950],
    foreground: palette.neutral[100],

    /* Text hierarchy */
    foregroundMuted: palette.neutral[300],
    foregroundSubtle: palette.neutral[400],

    /* Elevated surfaces — a hair lighter than the page for depth */
    surface: palette.neutral[900],
    surfaceForeground: palette.neutral[100],
    surfaceElevated: palette.neutral[850],
    surfaceElevatedForeground: palette.neutral[100],

    /* Muted */
    surfaceMuted: palette.neutral[800],
    surfaceMutedForeground: palette.neutral[400],

    /* Scrim behind modals / drawers */
    overlay: 'rgb(0 0 0 / 0.7)',

    /* Primary / brand  */
    primary: palette.brand[400],
    primaryHover: palette.brand[300],
    primaryActive: palette.brand[500],
    primaryForeground: palette.neutral[1000],
    primarySubtle: palette.brand[950],
    primarySubtleHover: palette.brand[900],
    primarySubtleActive: palette.brand[800],
    primarySubtleForeground: palette.brand[200],
    primarySubtleBorder: palette.brand[400],

    /* Links — higher contrast hover/active for clear affordance */
    link: palette.brand[300],
    linkHover: palette.brand[200],
    linkActive: palette.brand[400],

    /* Secondary (complementary to primary)  */
    secondary: palette.secondary[400],
    secondaryHover: palette.secondary[300],
    secondaryActive: palette.secondary[500],
    secondaryForeground: palette.neutral[1000],
    secondarySubtle: palette.secondary[950],
    secondarySubtleHover: palette.secondary[900],
    secondarySubtleActive: palette.secondary[800],
    secondarySubtleForeground: palette.secondary[200],
    secondarySubtleBorder: palette.secondary[400],

    /* Neutral actions */
    neutral: palette.neutral[700],
    neutralHover: palette.neutral[600],
    neutralActive: palette.neutral[500],
    neutralForeground: palette.neutral[0],
    neutralSubtle: palette.neutral[800],
    neutralSubtleHover: palette.neutral[700],
    neutralSubtleActive: palette.neutral[600],
    neutralSubtleForeground: palette.neutral[100],
    neutralSubtleBorder: palette.neutral[300],

    /* Status: success  */
    success: palette.green[400],
    successHover: palette.green[300],
    successActive: palette.green[500],
    successForeground: palette.neutral[1000],
    successSubtle: palette.green[950],
    successSubtleHover: palette.green[900],
    successSubtleActive: palette.green[800],
    successSubtleForeground: palette.green[200],
    successSubtleBorder: palette.green[400],

    /* Status: warning  */
    warning: palette.amber[400],
    warningHover: palette.amber[300],
    warningActive: palette.amber[500],
    warningForeground: palette.neutral[1000],
    warningSubtle: palette.amber[950],
    warningSubtleHover: palette.amber[900],
    warningSubtleActive: palette.amber[800],
    warningSubtleForeground: palette.amber[200],
    warningSubtleBorder: palette.amber[400],

    /* Status: info  */
    info: palette.blue[400],
    infoHover: palette.blue[300],
    infoActive: palette.blue[500],
    infoForeground: palette.neutral[1000],
    infoSubtle: palette.blue[950],
    infoSubtleHover: palette.blue[900],
    infoSubtleActive: palette.blue[800],
    infoSubtleForeground: palette.blue[200],
    infoSubtleBorder: palette.blue[400],

    /* Status: danger */
    danger: palette.red[400],
    dangerHover: palette.red[300],
    dangerActive: palette.red[500],
    dangerForeground: palette.neutral[1000],
    dangerSubtle: palette.red[950],
    dangerSubtleHover: palette.red[900],
    dangerSubtleActive: palette.red[800],
    dangerSubtleForeground: palette.red[200],
    dangerSubtleBorder: palette.red[400],

    /* Accent: purple  */
    accentPurple: palette.purple[400],
    accentPurpleHover: palette.purple[300],
    accentPurpleActive: palette.purple[500],
    accentPurpleForeground: palette.neutral[1000],
    accentPurpleSubtle: palette.purple[950],
    accentPurpleSubtleHover: palette.purple[900],
    accentPurpleSubtleActive: palette.purple[800],
    accentPurpleSubtleForeground: palette.purple[200],
    accentPurpleSubtleBorder: palette.purple[400],

    /* Accent: pink  */
    accentPink: palette.pink[400],
    accentPinkHover: palette.pink[300],
    accentPinkActive: palette.pink[500],
    accentPinkForeground: palette.neutral[1000],
    accentPinkSubtle: palette.pink[950],
    accentPinkSubtleHover: palette.pink[900],
    accentPinkSubtleActive: palette.pink[800],
    accentPinkSubtleForeground: palette.pink[200],
    accentPinkSubtleBorder: palette.pink[300],

    /* Accent: orange  */
    accentOrange: palette.orange[400],
    accentOrangeHover: palette.orange[300],
    accentOrangeActive: palette.orange[500],
    accentOrangeForeground: palette.neutral[1000],
    accentOrangeSubtle: palette.orange[950],
    accentOrangeSubtleHover: palette.orange[900],
    accentOrangeSubtleActive: palette.orange[800],
    accentOrangeSubtleForeground: palette.orange[200],
    accentOrangeSubtleBorder: palette.orange[400],

    /* Accent: teal  */
    accentTeal: palette.teal[400],
    accentTealHover: palette.teal[300],
    accentTealActive: palette.teal[500],
    accentTealForeground: palette.neutral[1000],
    accentTealSubtle: palette.teal[950],
    accentTealSubtleHover: palette.teal[900],
    accentTealSubtleActive: palette.teal[800],
    accentTealSubtleForeground: palette.teal[200],
    accentTealSubtleBorder: palette.teal[400],

    /* Accent: cyan  */
    accentCyan: palette.cyan[400],
    accentCyanHover: palette.cyan[300],
    accentCyanActive: palette.cyan[500],
    accentCyanForeground: palette.neutral[1000],
    accentCyanSubtle: palette.cyan[950],
    accentCyanSubtleHover: palette.cyan[900],
    accentCyanSubtleActive: palette.cyan[800],
    accentCyanSubtleForeground: palette.cyan[200],
    accentCyanSubtleBorder: palette.cyan[400],

    /* Accent: indigo  */
    accentIndigo: palette.indigo[400],
    accentIndigoHover: palette.indigo[300],
    accentIndigoActive: palette.indigo[500],
    accentIndigoForeground: palette.neutral[1000],
    accentIndigoSubtle: palette.indigo[950],
    accentIndigoSubtleHover: palette.indigo[900],
    accentIndigoSubtleActive: palette.indigo[800],
    accentIndigoSubtleForeground: palette.indigo[200],
    accentIndigoSubtleBorder: palette.indigo[400],

    /* Lines, fields & focus  */
    border: palette.neutral[500],
    borderStrong: palette.neutral[400],
    focusRing: palette.brand[400],

    /* Highlight  */
    highlight: palette.amber[400],
    highlightForeground: palette.neutral[950],

    /* Skeleton loading placeholders  */
    skeletonBase: palette.neutral[800],
    skeletonHighlight: palette.neutral[700],
} as const satisfies ThemeColors

/**
 * Dark-theme counterparts of the rich-text palettes in `lightEditorColors`.
 * Used by RichTextEditor and RichTextRenderer through `vars.editorColors`,
 * allowing the same color reference in content to resolve for either theme.
 *
 * Tone names remain stable identifiers: `dark` uses a lighter shade here,
 * while `light` uses a darker shade, adapting the palettes to dark surfaces.
 */
export const darkEditorColors = {
    ocean: {
        dark: palette.blue[300],
        base: palette.blue[500],
        light: palette.blue[700],
    },
    forest: {
        dark: palette.green[300],
        base: palette.green[500],
        light: palette.green[700],
    },
    sunset: {
        dark: palette.orange[300],
        base: palette.orange[500],
        light: palette.orange[700],
    },
    berry: {
        dark: palette.pink[300],
        base: palette.pink[500],
        light: palette.pink[700],
    },
    grape: {
        dark: palette.purple[300],
        base: palette.purple[500],
        light: palette.purple[700],
    },
    aqua: {
        dark: palette.teal[300],
        base: palette.teal[500],
        light: palette.teal[700],
    },
    neutral: {
        dark: palette.neutral[100],
        base: palette.neutral[300],
        light: palette.neutral[500],
    },
} as const satisfies ThemeEditorColors
