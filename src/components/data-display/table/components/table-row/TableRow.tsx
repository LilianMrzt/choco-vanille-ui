import { memo, useCallback, type FC, type KeyboardEvent } from 'react'

import { TABLE_ROW_STYLES } from '@components/data-display/table/components/table-row/styles/TableRow.css.ts'
import type { TableRowProps } from '@components/data-display/table/components/table-row/types/TableRow.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * `<tr>` slot for `Table`. Supports `hoverable`, `selectable`, `selected`,
 * and `intent` variants. When selectable, the row is keyboard-focusable and
 * sets `aria-selected`.
 */
const TableRow: FC<TableRowProps> = memo(({
    hoverable,
    selectable,
    selected,
    intent,
    className,
    ref,
    onKeyDown,
    ...props
}) => {
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTableRowElement>) => {
        if (selectable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            e.currentTarget.click()
        }
        onKeyDown?.(e)
    }, [selectable, onKeyDown])

    return (
        <tr
            ref={ref}
            data-intent={intent}
            aria-selected={selectable ? selected ?? false : undefined}
            tabIndex={selectable ? 0 : undefined}
            onKeyDown={selectable || onKeyDown ? handleKeyDown : undefined}
            className={cn(TABLE_ROW_STYLES.recipe({ hoverable, selectable, selected, intent }), className)}
            {...props}
        />
    )
})

TableRow.displayName = 'Table.Row'

export default TableRow
