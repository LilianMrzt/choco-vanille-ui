import { TABLE_STYLES } from '@components/data-display/table/Table.css.ts'
import TableBody from '@components/data-display/table/components/table-body/TableBody.tsx'
import TableCaption from '@components/data-display/table/components/table-caption/TableCaption.tsx'
import TableCell from '@components/data-display/table/components/table-cell/TableCell.tsx'
import TableCol from '@components/data-display/table/components/table-col/TableCol.tsx'
import TableColGroup from '@components/data-display/table/components/table-col-group/TableColGroup.tsx'
import TableFooter from '@components/data-display/table/components/table-footer/TableFooter.tsx'
import TableHead from '@components/data-display/table/components/table-head/TableHead.tsx'
import TableHeader from '@components/data-display/table/components/table-header/TableHeader.tsx'
import TableRow from '@components/data-display/table/components/table-row/TableRow.tsx'
import type { TableCompound } from '@components/data-display/table/types'
import { cn } from '@utils/cn.ts'

const Table = (({ size, striped, bordered, fixed, className, ref, ...props }) => (
    <div
        className={TABLE_STYLES.wrapper}
        // Scrollable overflow containers must be keyboard-reachable so users
        // can scroll them without a mouse (WCAG 2.1 SC 2.1.1).
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
    >
        <table
            ref={ref}
            data-striped={striped}
            data-bordered={bordered}
            className={cn(
                TABLE_STYLES.recipe({ size, striped, bordered, fixed }),
                className,
            )}
            {...props}
        />
    </div>
)) as TableCompound

Table.displayName = 'Table'
Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.Row = TableRow
Table.Head = TableHead
Table.Cell = TableCell
Table.Caption = TableCaption
Table.ColGroup = TableColGroup
Table.Col = TableCol

export default Table
