import type * as React from 'react'

import type { TableHeadRecipeVariants } from '@components/data-display/table/components/table-head/TableHead.css.ts'

export type TableSortDirection = 'asc' | 'desc' | 'none'

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> &
    React.RefAttributes<HTMLTableCellElement> &
    TableHeadRecipeVariants & {
        /**
         * Renders the column header as interactive (cursor pointer + hover tint).
         * Wire up an `onClick` handler to implement sorting logic.
         */
        sortable?: boolean
        /**
         * Current sort direction. Sets `aria-sort` on the `<th>` and appends
         * a visual indicator (↑ / ↓ / ↕) via CSS `::after`.
         */
        sortDirection?: TableSortDirection
    }
