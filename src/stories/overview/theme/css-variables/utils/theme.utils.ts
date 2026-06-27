import { vars } from '@theme/contract.css.ts'
import { lightTheme, darkTheme } from '@theme/tokens/index.ts'
import type { VarRow } from '@stories/overview/theme/css-variables/types'

// Core helpers
type FlatMap = Record<string, string>

/** "var(--color-primary)" → "--color-primary" */
export const cssVarName = (ref: string) => ref.slice(4, -1)

/** Build rows for a static (theme-agnostic) section. */
export const buildStaticRows = (values: FlatMap, varRefs: FlatMap): VarRow[] =>
    Object.entries(values).map(([k, lightValue]) => ({
        variable: cssVarName(varRefs[k]),
        lightValue,
    }))

/** Build rows for a theme-dependent section (light + dark columns). */
export const buildThemedRows = (
    lightValues: FlatMap,
    darkValues: FlatMap,
    varRefs: FlatMap,
): VarRow[] =>
    Object.entries(lightValues).map(([k, lightValue]) => ({
        variable: cssVarName(varRefs[k]),
        lightValue,
        darkValue: darkValues[k],
    }))

// Pre-built row sets (consumed by CssVariables.mdx)

const vc  = vars.color      as FlatMap
const vs  = vars.shadow     as FlatMap
const vds = vars.dropShadow as FlatMap

export const colorRows        = buildThemedRows(lightTheme.color as FlatMap, darkTheme.color as FlatMap, vc)
export const shadowRows       = buildThemedRows(lightTheme.shadow as FlatMap, darkTheme.shadow as FlatMap, vs)
export const dropShadowRows   = buildThemedRows(lightTheme.dropShadow as FlatMap, darkTheme.dropShadow as FlatMap, vds)
export const spacingRows      = buildStaticRows(lightTheme.space as FlatMap, vars.space as FlatMap)
export const radiusRows       = buildStaticRows(lightTheme.radius as FlatMap, vars.radius as FlatMap)
export const fontFamilyRows   = buildStaticRows(lightTheme.fontFamily as FlatMap, vars.fontFamily as FlatMap)
export const fontSizeRows     = buildStaticRows(lightTheme.fontSize as FlatMap, vars.fontSize as FlatMap)
export const fontWeightRows   = buildStaticRows(lightTheme.fontWeight as FlatMap, vars.fontWeight as FlatMap)
export const lineHeightRows   = buildStaticRows(lightTheme.lineHeight as FlatMap, vars.lineHeight as FlatMap)
export const letterSpacingRows = buildStaticRows(lightTheme.letterSpacing as FlatMap, vars.letterSpacing as FlatMap)
export const zIndexRows       = buildStaticRows(lightTheme.zIndex as FlatMap, vars.zIndex as FlatMap)
export const durationRows     = buildStaticRows(lightTheme.duration as FlatMap, vars.duration as FlatMap)
export const easingRows       = buildStaticRows(lightTheme.easing as FlatMap, vars.easing as FlatMap)

// CSS text generators

// Shared internal helpers

/** "--color-primary" with prefix "color" → "primary" */
const rowKey = (cssVar: string, prefix: string): string =>
    cssVar.slice(`--${prefix}-`.length)

// Plain CSS override scaffold

const plainSection = (comment: string, rows: VarRow[], themed = false): string => {
    const lines = rows.map(r => `  ${r.variable}: ;`).join('\n')
    const header = themed
        ? `\n  /* ${comment} — add dark-specific values below */\n`
        : `\n  /* ${comment} */\n`
    return `${header}${lines}`
}

export const buildPlainCssScaffold = (): string => {
    const rootBlock = [
        plainSection('Colors',         colorRows),
        plainSection('Shadows',        shadowRows),
        plainSection('Drop shadows',   dropShadowRows),
        plainSection('Spacing',        spacingRows),
        plainSection('Radius',         radiusRows),
        plainSection('Font families',  fontFamilyRows),
        plainSection('Font sizes',     fontSizeRows),
        plainSection('Font weights',   fontWeightRows),
        plainSection('Line heights',   lineHeightRows),
        plainSection('Letter spacing', letterSpacingRows),
        plainSection('Z-index',        zIndexRows),
        plainSection('Durations',      durationRows),
        plainSection('Easings',        easingRows),
    ].join('\n')

    const darkBlock = [
        plainSection('Colors',       colorRows,      true),
        plainSection('Shadows',      shadowRows,     true),
        plainSection('Drop shadows', dropShadowRows, true),
    ].join('\n')

    return [
        '/* @my-org/ui-kit — Plain CSS override scaffold                        */',
        '/* Fill in only the tokens you want to change, delete the rest.        */',
        '/* Import this file AFTER @my-org/ui-kit/styles.css.                  */',
        '',
        ':root {',
        rootBlock,
        '}',
        '',
        '[data-theme="dark"] {',
        darkBlock,
        '}',
    ].join('\n')
}

// Vanilla Extract token reference

const veSection = (comment: string, namespace: string, prefix: string, rows: VarRow[]): string => {
    const lines = rows.map(r => `//  vars.${namespace}.${rowKey(r.variable, prefix)}`).join('\n')
    return `\n// ${comment}\n${lines}`
}

export const buildVanillaExtractSnippet = (): string => {
    const tokenRef = [
        veSection('Colors',         'color',       'color',       colorRows),
        veSection('Shadows',        'shadow',      'shadow',      shadowRows),
        veSection('Drop shadows',   'dropShadow',  'dropShadow',  dropShadowRows),
        veSection('Spacing',        'space',       'space',       spacingRows),
        veSection('Radius',         'radius',      'radius',      radiusRows),
        veSection('Font families',  'fontFamily',  'fontFamily',  fontFamilyRows),
        veSection('Font sizes',     'fontSize',    'fontSize',    fontSizeRows),
        veSection('Font weights',   'fontWeight',  'fontWeight',  fontWeightRows),
        veSection('Line heights',   'lineHeight',  'lineHeight',  lineHeightRows),
        veSection('Letter spacing', 'letterSpacing','letterSpacing',letterSpacingRows),
        veSection('Z-index',        'zIndex',      'zIndex',      zIndexRows),
        veSection('Durations',      'duration',    'duration',    durationRows),
        veSection('Easings',        'easing',      'easing',      easingRows),
    ].join('\n')

    return [
        '// @my-org/ui-kit — Vanilla Extract token reference              ',
        '// Use any path below inside a *.css.ts file for full autocomplete.',
        '',
        "import { vars } from '@my-org/ui-kit';",
        "import { style } from '@vanilla-extract/css';",
        '',
        '// Available token paths ',
        tokenRef,
        '',
        '// Example usage ',
        'export const myCard = style({',
        '  color:         vars.color.primary,',
        '  background:    vars.color.card,',
        '  padding:       vars.space.md,',
        '  borderRadius:  vars.radius.md,',
        '  boxShadow:     vars.shadow.sm,',
        '  fontFamily:    vars.fontFamily.sans,',
        '});',
    ].join('\n')
}

// MUI createTheme bridge

export const buildMuiThemeSnippet = (): string => {
    const allColorVars = colorRows.map(r => r.variable).join(', ')

    return [
        '// @my-org/ui-kit — MUI createTheme bridge                              ',
        '// Feed kit CSS variables into MUI palette so both libraries share one  ',
        '// source of truth. MUI resolves var() at runtime → dark mode and       ',
        '// scoped overrides (data-theme / data-brand) apply automatically.      ',
        '',
        "import { createTheme } from '@mui/material/styles';",
        '',
        `// All available color variables: ${allColorVars}`,
        '',
        'export const muiTheme = createTheme({',
        '  palette: {',
        "    primary:    { main: 'var(--color-primary)',     dark: 'var(--color-primaryHover)',     contrastText: 'var(--color-primaryForeground)' },",
        "    secondary:  { main: 'var(--color-secondary)',   dark: 'var(--color-secondaryHover)',   contrastText: 'var(--color-secondaryForeground)' },",
        "    error:      { main: 'var(--color-destructive)', contrastText: 'var(--color-destructiveForeground)' },",
        "    warning:    { main: 'var(--color-warning)',     contrastText: 'var(--color-warningForeground)' },",
        "    success:    { main: 'var(--color-success)',     contrastText: 'var(--color-successForeground)' },",
        '    background: {',
        "      paper:   'var(--color-card)',",
        "      default: 'var(--color-background)',",
        '    },',
        '    text: {',
        "      primary:   'var(--color-foreground)',",
        "      secondary: 'var(--color-mutedForeground)',",
        '    },',
        '  },',
        '});',
    ].join('\n')
}

// Tailwind v4 @theme snippet (all keys as var() references)

const tailwindSection = (comment: string, rows: VarRow[]): string => {
    const lines = rows.map(r => `  ${r.variable}: var(${r.variable});`).join('\n')
    return `\n  /* ${comment} */\n${lines}`
}

export const buildTailwindTheme = (): string => {
    const sections = [
        tailwindSection('Colors',         colorRows),
        tailwindSection('Shadows',        shadowRows),
        tailwindSection('Drop shadows',   dropShadowRows),
        tailwindSection('Spacing',        spacingRows),
        tailwindSection('Radius',         radiusRows),
        tailwindSection('Font families',  fontFamilyRows),
        tailwindSection('Font sizes',     fontSizeRows),
        tailwindSection('Font weights',   fontWeightRows),
        tailwindSection('Line heights',   lineHeightRows),
        tailwindSection('Letter spacing', letterSpacingRows),
        tailwindSection('Z-index',        zIndexRows),
        tailwindSection('Durations',      durationRows),
        tailwindSection('Easings',        easingRows),
    ].join('\n')

    return [
        '/* @my-org/ui-kit — Tailwind v4 @theme mapping                        */',
        '/* Rename the left-hand side to your own Tailwind token names and     */',
        '/* delete any tokens you don\'t need.                                  */',
        '',
        '@import \'tailwindcss\';',
        '@import \'@my-org/ui-kit/styles.css\';',
        '',
        '@theme {',
        sections,
        '}',
    ].join('\n')
}

// CSS text generator (used by CopyThemeButton)

const cssSection = (comment: string, rows: VarRow[], useDark = false): string => {
    const lines = rows
        .map(r => `  ${r.variable}: ${useDark ? (r.darkValue ?? r.lightValue) : r.lightValue};`)
        .join('\n')
    return `\n  /* ${comment} */\n${lines}`
}

export const buildThemeCSS = (): string => {
    const lightRoot = [
        cssSection('Colors',         colorRows),
        cssSection('Shadows',        shadowRows),
        cssSection('Drop shadows',   dropShadowRows),
        cssSection('Spacing',        spacingRows),
        cssSection('Radius',         radiusRows),
        cssSection('Font families',  fontFamilyRows),
        cssSection('Font sizes',     fontSizeRows),
        cssSection('Font weights',   fontWeightRows),
        cssSection('Line heights',   lineHeightRows),
        cssSection('Letter spacing', letterSpacingRows),
        cssSection('Z-index',        zIndexRows),
        cssSection('Durations',      durationRows),
        cssSection('Easings',        easingRows),
    ].join('\n')

    const darkOverrides = [
        cssSection('Colors',       colorRows,      true),
        cssSection('Shadows',      shadowRows,     true),
        cssSection('Drop shadows', dropShadowRows, true),
    ].join('\n')

    return [
        '/* @my-org/ui-kit — theme override template                           */',
        '/* Change the values you want to override and delete the rest.        */',
        '',
        ':root {',
        lightRoot,
        '}',
        '',
        '[data-theme="dark"] {',
        darkOverrides,
        '}',
    ].join('\n')
}
