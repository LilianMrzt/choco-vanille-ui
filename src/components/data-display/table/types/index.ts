import type { FC } from 'react'

import type TableBody from '@components/data-display/table/components/table-body/TableBody.tsx'
import type TableCaption from '@components/data-display/table/components/table-caption/TableCaption.tsx'
import type TableCell from '@components/data-display/table/components/table-cell/TableCell.tsx'
import type TableCol from '@components/data-display/table/components/table-col/TableCol.tsx'
import type TableColGroup from '@components/data-display/table/components/table-col-group/TableColGroup.tsx'
import type TableFooter from '@components/data-display/table/components/table-footer/TableFooter.tsx'
import type TableHead from '@components/data-display/table/components/table-head/TableHead.tsx'
import type TableHeader from '@components/data-display/table/components/table-header/TableHeader.tsx'
import type TableRow from '@components/data-display/table/components/table-row/TableRow.tsx'
import type { TableProps } from '@components/data-display/table/types/Table.props.ts'

export type TableCompound = FC<TableProps> & {
    Header: typeof TableHeader
    Body: typeof TableBody
    Footer: typeof TableFooter
    Row: typeof TableRow
    Head: typeof TableHead
    Cell: typeof TableCell
    Caption: typeof TableCaption
    ColGroup: typeof TableColGroup
    Col: typeof TableCol
}
