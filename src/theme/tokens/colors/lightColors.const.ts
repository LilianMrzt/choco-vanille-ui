import { palette } from '@theme/tokens/colors/palette.const.ts'

/**
 * Light-theme semantic UI colors: surfaces, text hierarchy, action and status
 * families, accents, borders, focus indicators, highlights, and placeholders.
 * Each action/status/accent family includes solid and subtle treatments with
 * hover/active states and matching foregrounds.
 *
 * These are raw CSS color values, not variable references. Use `vars.color.<token>`
 * in component styles so colors follow the active theme; rich-text palettes
 * are defined separately in `lightEditorColors`.
 */
export const lightColors = {
    currentColor: 'currentColor',
    transparent: 'transparent',

    /* Base surfaces & text  */
    background: palette.neutral[50],
    foreground: palette.neutral[950],

    /* Text hierarchy */
    foregroundMuted: palette.neutral[600],
    foregroundSubtle: palette.neutral[550],

    /* Elevated surfaces */
    surface: palette.neutral[0],
    surfaceForeground: palette.neutral[950],
    surfaceElevated: palette.neutral[0],
    surfaceElevatedForeground: palette.neutral[950],

    /* Muted — quiet backgrounds & secondary text */
    surfaceMuted: palette.neutral[100],
    surfaceMutedForeground: palette.neutral[550],

    /* Scrim behind modals / drawers */
    overlay: 'rgb(0 0 0 / 0.5)',

    /* Primary / brand  */
    primary: palette.brand[600],
    primaryHover: palette.brand[700],
    primaryActive: palette.brand[800],
    primaryForeground: palette.neutral[0],
    primarySubtle: palette.brand[50],
    primarySubtleHover: palette.brand[100],
    primarySubtleActive: palette.brand[200],
    primarySubtleForeground: palette.brand[800],
    primarySubtleBorder: palette.brand[600],

    /* Links — higher contrast hover/active for clear affordance */
    link: palette.brand[600],
    linkHover: palette.brand[700],
    linkActive: palette.brand[800],

    /* Secondary (complementary to primary)  */
    secondary: palette.secondary[600],
    secondaryHover: palette.secondary[700],
    secondaryActive: palette.secondary[800],
    secondaryForeground: palette.neutral[0],
    secondarySubtle: palette.secondary[50],
    secondarySubtleHover: palette.secondary[100],
    secondarySubtleActive: palette.secondary[200],
    secondarySubtleForeground: palette.secondary[900],
    secondarySubtleBorder: palette.secondary[600],

    /* Neutral actions */
    neutral: palette.neutral[100],
    neutralHover: palette.neutral[200],
    neutralActive: palette.neutral[300],
    neutralForeground: palette.neutral[900],
    neutralSubtle: palette.neutral[50],
    neutralSubtleHover: palette.neutral[100],
    neutralSubtleActive: palette.neutral[200],
    neutralSubtleForeground: palette.neutral[900],
    neutralSubtleBorder: palette.neutral[500],

    /* Status: success  */
    success: palette.green[700],
    successHover: palette.green[800],
    successActive: palette.green[900],
    successForeground: palette.neutral[0],
    successSubtle: palette.green[50],
    successSubtleHover: palette.green[100],
    successSubtleActive: palette.green[200],
    successSubtleForeground: palette.green[900],
    successSubtleBorder: palette.green[700],

    /* Status: warning */
    warning: palette.amber[700],
    warningHover: palette.amber[800],
    warningActive: palette.amber[900],
    warningForeground: palette.neutral[0],
    warningSubtle: palette.amber[50],
    warningSubtleHover: palette.amber[100],
    warningSubtleActive: palette.amber[200],
    warningSubtleForeground: palette.amber[900],
    warningSubtleBorder: palette.amber[700],

    /* Status: info */
    info: palette.blue[700],
    infoHover: palette.blue[800],
    infoActive: palette.blue[900],
    infoForeground: palette.neutral[0],
    infoSubtle: palette.blue[50],
    infoSubtleHover: palette.blue[100],
    infoSubtleActive: palette.blue[200],
    infoSubtleForeground: palette.blue[900],
    infoSubtleBorder: palette.blue[700],

    /* Status: danger */
    danger: palette.red[700],
    dangerHover: palette.red[800],
    dangerActive: palette.red[900],
    dangerForeground: palette.neutral[0],
    dangerSubtle: palette.red[50],
    dangerSubtleHover: palette.red[100],
    dangerSubtleActive: palette.red[200],
    dangerSubtleForeground: palette.red[900],
    dangerSubtleBorder: palette.red[700],

    /* Accent: purple  */
    accentPurple: palette.purple[700],
    accentPurpleHover: palette.purple[800],
    accentPurpleActive: palette.purple[900],
    accentPurpleForeground: palette.neutral[0],
    accentPurpleSubtle: palette.purple[50],
    accentPurpleSubtleHover: palette.purple[100],
    accentPurpleSubtleActive: palette.purple[200],
    accentPurpleSubtleForeground: palette.purple[900],
    accentPurpleSubtleBorder: palette.purple[700],

    /* Accent: pink  */
    accentPink: palette.pink[700],
    accentPinkHover: palette.pink[800],
    accentPinkActive: palette.pink[900],
    accentPinkForeground: palette.neutral[0],
    accentPinkSubtle: palette.pink[50],
    accentPinkSubtleHover: palette.pink[100],
    accentPinkSubtleActive: palette.pink[200],
    accentPinkSubtleForeground: palette.pink[900],
    accentPinkSubtleBorder: palette.pink[700],

    /* Accent: orange  */
    accentOrange: palette.orange[700],
    accentOrangeHover: palette.orange[800],
    accentOrangeActive: palette.orange[900],
    accentOrangeForeground: palette.neutral[0],
    accentOrangeSubtle: palette.orange[50],
    accentOrangeSubtleHover: palette.orange[100],
    accentOrangeSubtleActive: palette.orange[200],
    accentOrangeSubtleForeground: palette.orange[900],
    accentOrangeSubtleBorder: palette.orange[700],

    /* Accent: teal  */
    accentTeal: palette.teal[700],
    accentTealHover: palette.teal[800],
    accentTealActive: palette.teal[900],
    accentTealForeground: palette.neutral[0],
    accentTealSubtle: palette.teal[50],
    accentTealSubtleHover: palette.teal[100],
    accentTealSubtleActive: palette.teal[200],
    accentTealSubtleForeground: palette.teal[900],
    accentTealSubtleBorder: palette.teal[700],

    /* Accent: cyan  */
    accentCyan: palette.cyan[700],
    accentCyanHover: palette.cyan[800],
    accentCyanActive: palette.cyan[900],
    accentCyanForeground: palette.neutral[0],
    accentCyanSubtle: palette.cyan[50],
    accentCyanSubtleHover: palette.cyan[100],
    accentCyanSubtleActive: palette.cyan[200],
    accentCyanSubtleForeground: palette.cyan[900],
    accentCyanSubtleBorder: palette.cyan[700],

    /* Accent: indigo  */
    accentIndigo: palette.indigo[600],
    accentIndigoHover: palette.indigo[700],
    accentIndigoActive: palette.indigo[800],
    accentIndigoForeground: palette.neutral[0],
    accentIndigoSubtle: palette.indigo[50],
    accentIndigoSubtleHover: palette.indigo[100],
    accentIndigoSubtleActive: palette.indigo[200],
    accentIndigoSubtleForeground: palette.indigo[900],
    accentIndigoSubtleBorder: palette.indigo[600],

    /* Lines, fields & focus  */
    border: palette.neutral[450],
    borderStrong: palette.neutral[500],
    focusRing: palette.brand[600],

    /* Highlight (Typography <mark>)  */
    highlight: palette.amber[200],
    highlightForeground: palette.amber[900],

    /* Skeleton loading placeholders  */
    skeletonBase: palette.neutral[200],
    skeletonHighlight: palette.neutral[300],
} as const

/**
 * Light-theme palettes for rich-text content, separate from semantic UI colors.
 * RichTextEditor offers seven named families with three tones (`dark`, `base`,
 * `light`); RichTextRenderer also uses the neutral family's default text tone.
 *
 * Use `vars.editorColors.<family>.<tone>` (for example, `vars.editorColors.ocean.base`)
 * instead of these raw values when content should follow theme changes.
 */
export const lightEditorColors = {
    ocean: {
        dark: palette.blue[700],
        base: palette.blue[500],
        light: palette.blue[300],
    },
    forest: {
        dark: palette.green[700],
        base: palette.green[500],
        light: palette.green[300],
    },
    sunset: {
        dark: palette.orange[700],
        base: palette.orange[500],
        light: palette.orange[300],
    },
    berry: {
        dark: palette.pink[700],
        base: palette.pink[500],
        light: palette.pink[300],
    },
    grape: {
        dark: palette.purple[700],
        base: palette.purple[500],
        light: palette.purple[300],
    },
    aqua: {
        dark: palette.teal[700],
        base: palette.teal[500],
        light: palette.teal[300],
    },
    neutral: {
        dark: palette.neutral[900],
        base: palette.neutral[700],
        light: palette.neutral[400],
    },
} as const
