import {
    Table
} from '@components/data-display/table'
import Box from '@components/layout/box/Box.tsx'
import { INVOICES } from '@stories/data-display/table/constants'
import type { TableStoryArgs } from '@stories/data-display/table/types'
import { formatAmount } from '@stories/data-display/table/components/table-playground/utils/formatAmount.utils'
import type { MouseEventHandler, ReactElement } from 'react'
import { useArgs } from 'storybook/preview-api'

/**
 * Renders a controlled compound demo using the current Storybook args.
 * Sorting orders the amount column; selection identifies one invoice.
 * @internal Not part of the public package API.
 * @param _args - Root props and demonstration controls accepted by the story render.
 * @returns An interactive semantic invoice table.
 * @example
 * <TablePlayground {...args} />
 */
const TablePlayground = (_args: TableStoryArgs): ReactElement => {
    const [args, updateArgs] = useArgs<TableStoryArgs>()
    const {
        caption, columnWidth, columnMinWidth, columnMaxWidth, headAlign,
        sortable, sortDirection, hoverable, selectable, selectedInvoice,
        intent, cellAlign, numeric, truncate, footerLabel, onSort, onSelect,
        ...tableProps
    } = args
    const rows = [...INVOICES]

    if (sortDirection === 'asc') {
        rows.sort((first, second) => first.amount - second.amount)
    } else if (sortDirection === 'desc') {
        rows.sort((first, second) => second.amount - first.amount)
    }

    /**
     * Calls the consumer sort handler and updates the uncancelled sort direction.
     * @internal Not part of the public package API.
     * @param event - Native header-cell click event; preventDefault cancels the args update.
     * @returns Nothing.
     * @example
     * <Table.Head onClick={handleSort}>Amount</Table.Head>
     */
    const handleSort: MouseEventHandler<HTMLTableCellElement> = (event) => {
        onSort(event)
        if (!event.defaultPrevented) {
            updateArgs({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
        }
    }
    /**
     * Calls the consumer selection handler and toggles the clicked invoice.
     * @internal Not part of the public package API.
     * @param event - Native row click event; preventDefault cancels the args update.
     * @returns Nothing.
     * @example
     * <Table.Row data-invoice="INV-001" onClick={handleSelect}><Table.Cell>INV-001</Table.Cell></Table.Row>
     */
    const handleSelect: MouseEventHandler<HTMLTableRowElement> = (event) => {
        onSelect(event)
        if (!event.defaultPrevented) {
            const invoice = event.currentTarget.dataset.invoice
            if (invoice !== undefined) {
                updateArgs({ selectedInvoice: selectedInvoice === invoice ? '' : invoice })
            }
        }
    }

    return (
        <Box
            maxWidth={'760px'}
            width={'100%'}
        >
            <Table {...tableProps}>
                <Table.Caption>{caption}</Table.Caption>
                <Table.ColGroup>
                    <Table.Col
                        maxWidth={columnMaxWidth || undefined}
                        minWidth={columnMinWidth || undefined}
                        width={columnWidth || undefined}
                    />
                    <Table.Col />
                </Table.ColGroup>
                <Table.Header>
                    <Table.Row>
                        <Table.Head align={headAlign}>Invoice</Table.Head>
                        <Table.Head
                            align={headAlign}
                            onClick={sortable ? handleSort : undefined}
                            sortable={sortable}
                            sortDirection={sortDirection === 'unset' ? undefined : sortDirection}
                        >
                            Amount
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row
                            data-invoice={row.invoice}
                            hoverable={hoverable}
                            intent={intent === 'unset' ? undefined : intent}
                            key={row.invoice}
                            onClick={selectable ? handleSelect : undefined}
                            selectable={selectable}
                            selected={selectedInvoice === row.invoice}
                        >
                            <Table.Cell
                                align={cellAlign}
                                title={row.invoice}
                                truncate={truncate}
                            >
                                {row.invoice}
                            </Table.Cell>
                            <Table.Cell
                                align={cellAlign}
                                numeric={numeric}
                            >
                                {formatAmount(row.amount)}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.Cell align={cellAlign}>{footerLabel}</Table.Cell>
                        <Table.Cell
                            align={cellAlign}
                            numeric={numeric}
                        >
                            $750.00
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Box>
    )
}

export default TablePlayground
