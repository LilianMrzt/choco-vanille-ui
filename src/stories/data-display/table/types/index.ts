import {
    type TableCellAlign,
    type TableProps,
    type TableRowIntent,
    type TableSortDirection
} from '@components/data-display/table'
import type { MouseEventHandler } from 'react'

export type TableStoryArgs = TableProps & Readonly<{
    caption: string
    columnWidth: string
    columnMinWidth: string
    columnMaxWidth: string
    headAlign: TableCellAlign
    sortable: boolean
    sortDirection: TableSortDirection | 'unset'
    hoverable: boolean
    selectable: boolean
    selectedInvoice: string
    intent: TableRowIntent | 'unset'
    cellAlign: TableCellAlign
    numeric: boolean
    truncate: boolean
    footerLabel: string
    onSort: MouseEventHandler<HTMLTableCellElement>
    onSelect: MouseEventHandler<HTMLTableRowElement>
}>
