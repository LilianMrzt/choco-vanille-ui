import type * as React from 'react'

import type { TableRecipeVariants } from '@components/data-display/table/Table.css.ts'

export type TableProps = React.HTMLAttributes<HTMLTableElement> &
    React.RefAttributes<HTMLTableElement> &
    TableRecipeVariants & {
        /** Applies an alternating background to even body rows. */
        striped?: boolean
        /** Adds borders on all four sides of every header and data cell. */
        bordered?: boolean
        /**
         * Sets `table-layout: fixed`. Required for column widths defined via
         * `TableColGroup` / `TableCol` (or `style.width` on `TableHead`) to
         * take effect reliably. Also improves rendering performance on long tables.
         */
        fixed?: boolean
    }
