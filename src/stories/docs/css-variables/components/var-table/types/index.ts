import type { VarRow } from '@stories/docs/css-variables/types'

export type VarTableProps = Readonly<{
    caption: string
    rows: readonly VarRow[]
    /** Show a color swatch next to values */
    showSwatch?: boolean
}>
