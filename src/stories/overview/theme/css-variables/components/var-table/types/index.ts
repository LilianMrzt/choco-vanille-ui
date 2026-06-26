import type { VarRow } from '@stories/overview/theme/css-variables/utils/theme.utils.ts'

export interface VarTableProps {
    rows: VarRow[]
    /** Show a colour swatch next to values */
    showSwatch?: boolean
}
