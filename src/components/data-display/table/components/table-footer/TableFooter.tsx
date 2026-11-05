import type { FC } from 'react'

import { TABLE_FOOTER_STYLES } from '@components/data-display/table/components/table-footer/TableFooter.css.ts'
import type { TableFooterProps } from '@components/data-display/table/components/table-footer/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Groups summary rows in `Table.Footer` with a muted background and medium
 * weight text. Place semantic rows inside and label totals in their cells.
 * Native attributes, events, className, style, and ref target the tfoot.
 *
 * @param props - Native footer-section attributes.
 * @param props.className - Consumer class merged with the footer-section class.
 * @param props.ref - Ref forwarded to the tfoot element.
 * @param props.children - Summary rows belonging to the table footer.
 * @returns A semantic table footer.
 * @example
 * <Table.Footer><Table.Row><Table.Cell>Total: $250.00</Table.Cell></Table.Row></Table.Footer>
 */
const TableFooter: FC<TableFooterProps> = ({ className, ref, ...props }) => (
    <tfoot
        ref={ref}
        className={cn(TABLE_FOOTER_STYLES.root, className)}
        {...props}
    />
)

TableFooter.displayName = 'Table.Footer'

export default TableFooter
