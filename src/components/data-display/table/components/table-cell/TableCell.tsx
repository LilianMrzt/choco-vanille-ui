import type { FC } from 'react'

import { TABLE_CELL_STYLES } from '@components/data-display/table/components/table-cell/TableCell.css.ts'
import type { TableCellProps } from '@components/data-display/table/components/table-cell/types/TableCell.props.ts'
import { cn } from '@utils/cn.ts'

const TableCell: FC<TableCellProps> = ({
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
)

TableCell.displayName = 'Table.Cell'

export default TableCell
