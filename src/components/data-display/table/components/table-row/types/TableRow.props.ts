import type * as React from 'react'

import type { TableRowIntent } from '@components/data-display/table/types/Table.types.ts'

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> &
    React.RefAttributes<HTMLTableRowElement> &
    {
        hoverable?: boolean
        selectable?: boolean
        selected?: boolean
        intent?: TableRowIntent
    }
