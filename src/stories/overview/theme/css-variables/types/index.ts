/** A single row in the variable table. `darkValue` is present only for theme-dependent tokens. */
export type VarRow = Readonly<{
    variable: string
    lightValue: string
    darkValue?: string
}>

export type FlatMap = Readonly<Record<string, string>>

export type EditorPaletteMap = Readonly<Record<string, FlatMap>>
