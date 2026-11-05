import type { FC } from 'react'

import { TABLE_BODY_STYLES } from '@components/data-display/table/components/table-body/TableBody.css.ts'
import type { TableBodyProps } from '@components/data-display/table/components/table-body/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Groups data rows in `Table.Body`. The last row has no bottom border.
 * Native attributes, events, className, style, and ref target the tbody.
 * Place rows inside this section and provide the table's accessible name.
 *
 * @param props - Native tbody attributes.
 * @param props.className - Consumer class merged with the body-section class.
 * @param props.ref - Ref forwarded to the tbody element.
 * @param props.children - Data rows belonging to the table body.
 * @returns A semantic table body.
 * @example
 * <Table.Body><Table.Row><Table.Cell>Invoice</Table.Cell></Table.Row></Table.Body>
 */
const TableBody: FC<TableBodyProps> = ({ className, ref, ...props }) => (
    <tbody
        ref={ref}
        className={cn(TABLE_BODY_STYLES.root, className)}
        {...props}
    />
)

TableBody.displayName = 'Table.Body'

export default TableBody
