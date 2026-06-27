import type * as React from 'react'

import type { TableRowRecipeVariants } from '@components/data-display/table/components/table-row/TableRow.css.ts'

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> &
    React.RefAttributes<HTMLTableRowElement> &
    TableRowRecipeVariants & {
        /**
         * Makes the row visually interactive: adds `cursor: pointer` + hover
         * background + `aria-selected`. Use with `onClick` and `selected` for
         * a controlled selection pattern without extra wrapper components.
         * Implies `hoverable` behaviour.
         */
        selectable?: boolean
    }
