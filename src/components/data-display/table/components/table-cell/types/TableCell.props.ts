import type * as React from 'react'

import type { TableCellRecipeVariants } from '@components/data-display/table/components/table-cell/styles/TableCell.css.ts'

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
    React.RefAttributes<HTMLTableCellElement> &
    TableCellRecipeVariants & {
        /**
         * Right-aligns the content and enables tabular number rendering.
         * Takes precedence over the `align` variant when both are set.
         */
        numeric?: boolean
        /**
         * Clips overflowing text with an ellipsis. The column must have a
         * constrained width (e.g. `style={{ maxWidth: '12rem' }}`) for
         * truncation to activate in table context.
         */
        truncate?: boolean
    }
