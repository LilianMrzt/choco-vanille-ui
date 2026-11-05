import type { FC } from 'react'

import { TABLE_CELL_STYLES } from '@components/data-display/table/components/table-cell/TableCell.css.ts'
import type { TableCellProps } from '@components/data-display/table/components/table-cell/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Displays data in `Table.Cell`, left-aligned by default. Numeric content
 * uses tabular numbers and right alignment, overriding align. Truncation
 * requires a constrained column width; provide full content access when needed.
 * Native attributes (including spans), events, className, style, and ref target
 * the td. Consumer style overrides the default presentation.
 *
 * @param props - Native data-cell attributes and presentation options.
 * @param props.align - Text alignment; defaults to `left` unless numeric is true.
 * @param props.numeric - Enables tabular figures and right alignment; defaults to false.
 * @param props.truncate - Enables single-line truncation in constrained columns; defaults to false.
 * @param props.className - Consumer class merged with the data-cell classes.
 * @param props.ref - Ref forwarded to the td element.
 * @param props.children - Cell content; keep truncated content available when needed.
 * @returns A semantic data cell.
 * @example
 * <Table.Cell numeric>$250.00</Table.Cell>
 */
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
