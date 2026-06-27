import type { FC } from 'react'

import {
    tableCellRecipe,
    tableCellNumericClass,
    tableCellTruncateClass,
} from '@components/data-display/table/components/table-cell/TableCell.css.ts'
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
            tableCellRecipe({ align }),
            numeric && tableCellNumericClass,
            truncate && tableCellTruncateClass,
            className,
        )}
        {...props}
    />
)

TableCell.displayName = 'TableCell'

export default TableCell
