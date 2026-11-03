/** A single row in the variable table. `darkValue` is present only for theme-dependent tokens. */
export type VarRow = Readonly<{
    variable: string
    lightValue: string
    darkValue?: string
}>

export type FlatMap = Readonly<Record<string, string>>

export type EditorPaletteMap = Readonly<Record<string, FlatMap>>

export type CssVariableReferenceArgs = Readonly<{
    theme: 'light' | 'dark'
    category: 'all' | keyof Theme
    search: string
}>

export type VariableSection = Readonly<{
    key: keyof Theme
    title: string
    rows: readonly VarRow[]
    showSwatch?: boolean
}>
import type { Theme } from '@theme'
