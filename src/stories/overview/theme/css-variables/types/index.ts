/** A single row in the variable table. `darkValue` is present only for theme-dependent tokens. */
export type VarRow = {
    variable: string
    lightValue: string
    darkValue?: string
}
