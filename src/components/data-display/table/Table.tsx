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
import Box from '@components/layout/box/Box.tsx'
import type { TableProps } from '@components/data-display/table/types'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * Semantic, horizontally scrollable table with composable native sections.
 * Defaults to medium density with no stripes, cell borders, or fixed layout.
 * Provide `Table.Caption` or an accessible name through native ARIA attributes.
 * Native attributes, events, className, style, and ref target the table, not
 * the keyboard-focusable scroll container. Consumer style overrides table CSS.
 *
 * @param props - Native table attributes and presentation options.
 * @param props.size - Cell-density preset; defaults to `md`.
 * @param props.striped - Enables alternating body-row backgrounds; defaults to false.
 * @param props.bordered - Enables borders between cells; defaults to false.
 * @param props.fixed - Enables fixed table layout; defaults to false.
 * @param props.className - Consumer class merged with the table classes.
 * @param props.ref - Ref forwarded to the table, not its scroll container.
 * @param props.children - Caption, column definitions and semantic table sections.
 * @returns The table inside its scroll container.
 * @example
 * <Table striped>
 *     <Table.Caption>Invoices</Table.Caption>
 *     <Table.Body><Table.Row><Table.Cell>INV-001</Table.Cell></Table.Row></Table.Body>
 * </Table>
 */
const TableRoot: FC<TableProps> = ({
    size,
    striped,
    bordered,
    fixed,
    className,
    ref,
    ...props
}) => (
    <Box
        className={TABLE_STYLES.wrapper}
        overflowX={'auto'}
        position={'relative'}
        tabIndex={0}
        width={'100%'}
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
    </Box>
)

TableRoot.displayName = 'Table'

/**
 * Semantic table compound with native Caption, ColGroup, Col, Header, Body,
 * Footer, Row, Head and Cell slots. Defaults to medium density and a
 * keyboard-focusable horizontal scroll container. Supply a Caption or native
 * accessible name; attributes, events, className, style and ref target the table.
 *
 * @param props - Native table attributes and presentation options.
 * @param props.size - Cell-density preset; defaults to `md`.
 * @param props.striped - Enables alternating body-row backgrounds; defaults to false.
 * @param props.bordered - Enables borders between cells; defaults to false.
 * @param props.fixed - Enables fixed table layout; defaults to false.
 * @param props.className - Consumer class merged with the table classes.
 * @param props.ref - Ref forwarded to the table, not its scroll container.
 * @param props.children - Caption, column definitions and semantic table sections.
 * @returns A scrollable table with the supplied semantic compound content.
 * @example
 * <Table striped>
 *     <Table.Caption>Invoices</Table.Caption>
 *     <Table.Body><Table.Row><Table.Cell>INV-001</Table.Cell></Table.Row></Table.Body>
 * </Table>
 */
const Table = Object.assign(TableRoot, {
    Header: TableHeader,
    Body: TableBody,
    Footer: TableFooter,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
    Caption: TableCaption,
    ColGroup: TableColGroup,
    Col: TableCol,
})

export default Table
