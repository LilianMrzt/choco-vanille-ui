import { memo, type FC } from 'react'

import { TABLE_CELL_STYLES } from '@components/data-display/table/components/table-cell/styles/TableCell.css.ts'
import type { TableCellProps } from '@components/data-display/table/components/table-cell/types/TableCell.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * `<td>` slot for `Table`. Supports `align`, `numeric`, and `truncate`
 * variants and forwards all native `<td>` attributes.
 */
const TableCell: FC<TableCellProps> = memo(({
    align,
    numeric,
    truncate,
    className,
    ref,
    ...props
}) => (
    <td
        ref={ref}
        className={cn(
            TABLE_CELL_STYLES.recipe({ align }),
            numeric && TABLE_CELL_STYLES.numeric,
            truncate && TABLE_CELL_STYLES.truncate,
            className,
        )}
        {...props}
    />
))

TableCell.displayName = 'Table.Cell'

export default TableCell
