import type { FC, KeyboardEvent } from 'react'

import { Icon } from '@components/foundation/icon'
import {
    tableHeadRecipe,
    tableHeadSortableClass,
    tableHeadSortWrapperClass,
    tableHeadSortIconClass,
    tableHeadSortIconActiveClass,
} from '@components/data-display/table/components/table-head/TableHead.css.ts'
import type { TableHeadProps, TableSortDirection } from '@components/data-display/table/components/table-head/types/TableHead.props.ts'
import { cn } from '@utils/cn.ts'

const SORT_ICONS: Record<TableSortDirection, string> = {
    none: 'lucide:arrow-up-down',
    asc: 'lucide:arrow-up',
    desc: 'lucide:arrow-down',
}

const ariaSortMap = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none',
} as const

const TableHead: FC<TableHeadProps> = ({
    align,
    sortable,
    sortDirection,
    children,
    className,
    ref,
    onKeyDown,
    ...props
}) => {
    const isActiveSort = sortDirection === 'asc' || sortDirection === 'desc'

    const handleKeyDown = (e: KeyboardEvent<HTMLTableCellElement>) => {
        if (sortable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            e.currentTarget.click()
        }
        onKeyDown?.(e)
    }

    return (
        <th
            // `scope="col"` is overridable — pass `scope="row"` for row-header cells
            scope={'col'}
            tabIndex={sortable ? 0 : undefined}
            {...props}
            ref={ref}
            aria-sort={sortDirection ? ariaSortMap[sortDirection] : undefined}
            onKeyDown={sortable || onKeyDown ? handleKeyDown : undefined}
            className={cn(
                tableHeadRecipe({ align }),
                sortable && tableHeadSortableClass,
                className,
            )}
        >
            {sortDirection !== undefined ? (
                <span className={tableHeadSortWrapperClass}>
                    {children}
                    <Icon
                        icon={SORT_ICONS[sortDirection]}
                        size={'xs'}
                        className={cn(
                            tableHeadSortIconClass,
                            isActiveSort && tableHeadSortIconActiveClass,
                        )}
                    />
                </span>
            ) : (
                children
            )}
        </th>
    )
}

TableHead.displayName = 'TableHead'

export default TableHead
