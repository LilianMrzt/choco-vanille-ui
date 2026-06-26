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
