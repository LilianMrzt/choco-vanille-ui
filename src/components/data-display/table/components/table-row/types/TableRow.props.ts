import type * as React from 'react'

import type { TableRowRecipeVariants } from '@components/data-display/table/components/table-row/styles/TableRow.css.ts'

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> &
    React.RefAttributes<HTMLTableRowElement> &
    TableRowRecipeVariants
