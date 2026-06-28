import type { VarRow } from '@stories/overview/theme/css-variables/types'

export interface VarTableProps {
    rows: VarRow[]
    /** Show a color swatch next to values */
    showSwatch?: boolean
}
