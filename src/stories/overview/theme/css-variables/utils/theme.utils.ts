import { vars } from '@theme/styles/contract/contract.css.ts'
import { lightTheme, darkTheme } from '@theme/themes/themes.const.ts'
import type { EditorPaletteMap, FlatMap, VarRow } from '@stories/overview/theme/css-variables/types'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

/** "var(--color-primary-main)" → "--color-primary-main" */
export const cssVarName = (ref: string): string => ref.slice(4, -1)

/** Build rows for a static (theme-agnostic) section. */
export const buildStaticRows = (values: FlatMap, varRefs: FlatMap): VarRow[] =>
    Object.entries(values).map(([key, lightValue]) => {
        const reference = varRefs[key]
        if (reference === undefined) {
            throw new Error(`Missing CSS variable reference: ${key}`)
        }

        return { variable: cssVarName(reference), lightValue }
    })

/** Build rows for a theme-dependent section (light + dark columns). */
export const buildThemedRows = (
    lightValues: FlatMap,
    darkValues: FlatMap,
    varRefs: FlatMap,
): VarRow[] =>
    Object.entries(lightValues).map(([key, lightValue]) => {
        const reference = varRefs[key]
        const darkValue = darkValues[key]
        if (reference === undefined || darkValue === undefined) {
            throw new Error(`Incomplete themed CSS variable: ${key}`)
        }

        return { variable: cssVarName(reference), lightValue, darkValue }
    })

// Pre-built row sets (consumed by CssVariables.mdx)

const lightEditorPalettes: EditorPaletteMap = lightTheme.editorColors
const darkEditorPalettes: EditorPaletteMap = darkTheme.editorColors
const editorReferences: EditorPaletteMap = vars.editorColors

export const editorColorRows = Object.entries(lightEditorPalettes).flatMap(([name, values]) => {
    const darkValues = darkEditorPalettes[name]
    const references = editorReferences[name]
    if (darkValues === undefined || references === undefined) {
        throw new Error(`Incomplete editor palette: ${name}`)
    }

    return buildThemedRows(values, darkValues, references)
})

export const colorRows = buildThemedRows(
    Object.fromEntries(getColorEntries(lightTheme.color)),
    Object.fromEntries(getColorEntries(darkTheme.color)),
    Object.fromEntries(getColorEntries(vars.color)),
)
export const shadowRows = buildThemedRows(lightTheme.shadow, darkTheme.shadow, vars.shadow)
export const dropShadowRows = buildThemedRows(lightTheme.dropShadow, darkTheme.dropShadow, vars.dropShadow)
export const spacingRows = buildStaticRows(lightTheme.space, vars.space)
export const radiusRows = buildStaticRows(lightTheme.radius, vars.radius)
export const fontFamilyRows = buildStaticRows(lightTheme.fontFamily, vars.fontFamily)
export const fontSizeRows = buildStaticRows(lightTheme.fontSize, vars.fontSize)
export const fontWeightRows = buildStaticRows(lightTheme.fontWeight, vars.fontWeight)
export const lineHeightRows = buildStaticRows(lightTheme.lineHeight, vars.lineHeight)
export const letterSpacingRows = buildStaticRows(lightTheme.letterSpacing, vars.letterSpacing)
export const zIndexRows = buildStaticRows(lightTheme.zIndex, vars.zIndex)
export const durationRows = buildStaticRows(lightTheme.duration, vars.duration)
export const easingRows = buildStaticRows(lightTheme.easing, vars.easing)

// CSS text generators

// Shared internal helpers

/** "--color-primary-main" with prefix "color" → "primary" */
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
        plainSection('Editor colors', editorColorRows),
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
        plainSection('Editor colors', editorColorRows, true),
        plainSection('Shadows',      shadowRows,     true),
        plainSection('Drop shadows', dropShadowRows, true),
    ].join('\n')

    return [
        '/* @choco-vanille/ui — Plain CSS override scaffold                    */',
        '/* Fill in only the tokens you want to change, delete the rest.        */',
        '/* Import kit components in the application entry before using tokens.  */',
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
    const lines = rows.map(r => {
        const key = rowKey(r.variable, prefix)
        const tokenPath = namespace === 'color' ? key.replace('-', '.') : key
        return `//  vars.${namespace}.${tokenPath}`
    }).join('\n')
    return `\n// ${comment}\n${lines}`
}

export const buildVanillaExtractSnippet = (): string => {
    const tokenRef = [
        veSection('Colors',         'color',       'color',       colorRows),
        ...Object.entries(editorReferences).map(([name, references]) => {
            const rows = buildStaticRows(lightEditorPalettes[name], references)
            return veSection(`Editor ${name}`, `editorColors.${name}`, `editorColors-${name}`, rows)
        }),
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
        '// @choco-vanille/ui — Vanilla Extract token reference          ',
        '// Use any path below inside a *.css.ts file for full autocomplete.',
        '',
        "import { vars } from '@choco-vanille/ui';",
        "import { style } from '@vanilla-extract/css';",
        '',
        '// Available token paths ',
        tokenRef,
        '',
        '// Example usage ',
        'export const myCard = style({',
        '  color:         vars.color.primary.main,',
        '  background:    vars.color.surface.main,',
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
        '// @choco-vanille/ui — MUI createTheme bridge                          ',
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
        "    primary:    { main: 'var(--color-primary-main)',     dark: 'var(--color-primary-hover)',     contrastText: 'var(--color-primary-foreground)' },",
        "    secondary:  { main: 'var(--color-secondary-main)',   dark: 'var(--color-secondary-hover)',   contrastText: 'var(--color-secondary-foreground)' },",
        "    error:      { main: 'var(--color-danger-main)', contrastText: 'var(--color-danger-foreground)' },",
        "    warning:    { main: 'var(--color-warning-main)',     contrastText: 'var(--color-warning-foreground)' },",
        "    success:    { main: 'var(--color-success-main)',     contrastText: 'var(--color-success-foreground)' },",
        '    background: {',
        "      paper:   'var(--color-surface-main)',",
        "      default: 'var(--color-background)',",
        '    },',
        '    text: {',
        "      primary:   'var(--color-text-primary)',",
        "      secondary: 'var(--color-surface-mutedForeground)',",
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
        tailwindSection('Editor colors', editorColorRows),
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
        '/* @choco-vanille/ui — Tailwind v4 @theme mapping                    */',
        '/* Rename the left-hand side to your own Tailwind token names and     */',
        '/* delete any tokens you don\'t need.                                  */',
        '',
        '@import \'tailwindcss\';',
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
        cssSection('Editor colors', editorColorRows),
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
        cssSection('Editor colors', editorColorRows, true),
        cssSection('Shadows',      shadowRows,     true),
        cssSection('Drop shadows', dropShadowRows, true),
    ].join('\n')

    return [
        '/* @choco-vanille/ui — theme override template                       */',
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
