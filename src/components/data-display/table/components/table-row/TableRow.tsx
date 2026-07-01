import type { FC, KeyboardEvent } from 'react'

import { TABLE_ROW_STYLES } from '@components/data-display/table/components/table-row/TableRow.css.ts'
import type { TableRowProps } from '@components/data-display/table/components/table-row/types/TableRow.props.ts'
import { cn } from '@utils/cn.ts'

const TableRow: FC<TableRowProps> = ({
    hoverable,
    selectable,
    selected,
    intent,
    className,
    ref,
    onKeyDown,
    ...props
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
        if (selectable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            e.currentTarget.click()
        }
        onKeyDown?.(e)
    }

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
}

TableRow.displayName = 'TableRow'

export default TableRow
