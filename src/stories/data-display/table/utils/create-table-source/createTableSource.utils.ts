import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { INVOICES } from '@stories/data-display/table/constants'
import type { TableStoryArgs } from '@stories/data-display/table/types'
import tableSource from '@stories/data-display/table/utils/create-table-source/sources/Table.source.tsx.txt?raw'

/**
 * Produces public consumer JSX matching all current table instances and args.
 * @internal Not part of the public package API.
 * @param _source - Generated Storybook source, replaced by public composition.
 * @param context - Current root and compound demonstration args.
 * @param context.args - Table props, slot controls and consumer sort/selection callbacks used in the example.
 * @returns A consumer example with real sorting and selection state.
 * @example
 * createTableSource('', { args })
 */
export const createTableSource = (_source: string, context: Readonly<{ args: TableStoryArgs }>): string => {
    const args = context.args
    const sortDirection = args.sortDirection === 'unset' ? 'undefined' : JSON.stringify(args.sortDirection)
    const intent = args.intent === 'unset' ? 'undefined' : JSON.stringify(args.intent)
    const ariaLabelAttribute = args['aria-label'] === undefined ? '' : 'aria-label={' + JSON.stringify(args['aria-label']) + '}'
    const titleAttribute = args.title === undefined ? '' : 'title={' + JSON.stringify(args.title) + '}'

    return renderSource(tableSource, {
        invoices: JSON.stringify(INVOICES, null, 4),
        sortDirection,
        selectedInvoice: JSON.stringify(args.selectedInvoice),
        size: JSON.stringify(args.size) ?? 'undefined',
        striped: String(args.striped),
        bordered: String(args.bordered),
        fixed: String(args.fixed),
        ariaLabelAttribute,
        titleAttribute,
        caption: JSON.stringify(args.caption),
        columnMaxWidth: JSON.stringify(args.columnMaxWidth || undefined) ?? 'undefined',
        columnMinWidth: JSON.stringify(args.columnMinWidth || undefined) ?? 'undefined',
        columnWidth: JSON.stringify(args.columnWidth || undefined) ?? 'undefined',
        headAlign: JSON.stringify(args.headAlign),
        onSort: args.sortable ? 'handleSort' : 'undefined',
        sortable: String(args.sortable),
        hoverable: String(args.hoverable),
        intent,
        onSelect: args.selectable ? 'handleSelect' : 'undefined',
        selectable: String(args.selectable),
        cellAlign: JSON.stringify(args.cellAlign),
        truncate: String(args.truncate),
        numeric: String(args.numeric),
        footerLabel: JSON.stringify(args.footerLabel),
    })
}
