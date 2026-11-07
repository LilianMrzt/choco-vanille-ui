import { vars } from '@theme/styles/contract/contract.css.ts'
import { lightTheme, darkTheme } from '@theme/themes/themes.const.ts'
import type { EditorPaletteMap, FlatMap, VarRow } from '@stories/docs/css-variables/types'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'
import { formatTokenReference } from '@stories/_shared/utils/token-reference/tokenReference.utils'
import buildThemeCSSTemplate from '@stories/docs/css-variables/utils/theme/sources/buildThemeCSS.source.txt?raw'
import buildTailwindThemeTemplate from '@stories/docs/css-variables/utils/theme/sources/buildTailwindTheme.source.txt?raw'
import buildMuiThemeSnippetTemplate from '@stories/docs/css-variables/utils/theme/sources/buildMuiThemeSnippet.source.txt?raw'
import buildVanillaExtractSnippetTemplate from '@stories/docs/css-variables/utils/theme/sources/buildVanillaExtractSnippet.source.txt?raw'
import buildPlainCssScaffoldTemplate from '@stories/docs/css-variables/utils/theme/sources/buildPlainCssScaffold.source.txt?raw'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import cssSectionTemplate from '@stories/docs/css-variables/utils/theme/sources/CssSection.source.txt?raw'
import plainSectionTemplate from '@stories/docs/css-variables/utils/theme/sources/PlainSection.source.txt?raw'
import referenceSectionTemplate from '@stories/docs/css-variables/utils/theme/sources/ReferenceSection.source.txt?raw'

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

// Pre-built row sets for the CSS variable reference.

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
    return renderSource(plainSectionTemplate, {
        comment,
        note: themed ? ' — add dark-specific values below' : '',
        lines,
    }).trimEnd()
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

    return renderSource(buildPlainCssScaffoldTemplate, { fragment5: String(rootBlock), fragment9: String(darkBlock) })
}

// Vanilla Extract token reference

const veSection = (comment: string, namespace: string, prefix: string, rows: VarRow[]): string => {
    const lines = rows.map(r => {
        const key = rowKey(r.variable, prefix)
        const tokenPath = namespace === 'color' ? key.replace('-', '.') : key
        const reference = formatTokenReference(`${namespace}.${tokenPath}`)
        return `// ${reference}`
    }).join('\n')
    return renderSource(referenceSectionTemplate, { comment, lines }).trimEnd()
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
        veSection('Z-index',        'zIndex',      'zIndex',      zIndexRows),
        veSection('Durations',      'duration',    'duration',    durationRows),
        veSection('Easings',        'easing',      'easing',      easingRows),
    ].join('\n')

    return renderSource(buildVanillaExtractSnippetTemplate, { fragment7: String(tokenRef) })
}

// MUI createTheme bridge

export const buildMuiThemeSnippet = (): string => {
    const allColorVars = colorRows.map(r => r.variable).join(', ')

    return renderSource(buildMuiThemeSnippetTemplate, { fragment7_0: String(allColorVars) })
}

// Tailwind v4 @theme snippet (all keys as var() references)

const tailwindSection = (comment: string, rows: VarRow[]): string => {
    const lines = rows.map(r => `  ${r.variable}: var(${r.variable});`).join('\n')
    return renderSource(cssSectionTemplate, { comment, lines }).trimEnd()
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
        tailwindSection('Z-index',        zIndexRows),
        tailwindSection('Durations',      durationRows),
        tailwindSection('Easings',        easingRows),
    ].join('\n')

    return renderSource(buildTailwindThemeTemplate, { fragment7: String(sections) })
}

// CSS text generator for the full-theme copy action.

const cssSection = (comment: string, rows: VarRow[], useDark = false): string => {
    const lines = rows
        .map(r => `  ${r.variable}: ${useDark ? (r.darkValue ?? r.lightValue) : r.lightValue};`)
        .join('\n')
    return renderSource(cssSectionTemplate, { comment, lines }).trimEnd()
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

    return renderSource(buildThemeCSSTemplate, { fragment4: String(lightRoot), fragment8: String(darkOverrides) })
}
