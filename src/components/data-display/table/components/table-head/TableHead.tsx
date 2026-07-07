import type { FC, KeyboardEvent } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { TABLE_HEAD_STYLES } from '@components/data-display/table/components/table-head/styles/TableHead.css.ts'
import type {
    TableHeadProps,
    TableSortDirection,
} from '@components/data-display/table/components/table-head/types/TableHead.props.ts'
import { cn } from '@utils/cn.ts'

const SORT_ICONS: Record<TableSortDirection, string> = {
    none: IconRegistry.sort,
    asc: IconRegistry.sortAsc,
    desc: IconRegistry.sortDesc,
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
                TABLE_HEAD_STYLES.recipe({ align }),
                sortable && TABLE_HEAD_STYLES.sortable,
                className,
            )}
        >
            {sortDirection !== undefined ? (
                <span className={TABLE_HEAD_STYLES.sortWrapper}>
                    {children}
                    <Icon
                        icon={SORT_ICONS[sortDirection]}
                        size={'xs'}
                        className={cn(
                            TABLE_HEAD_STYLES.sortIcon,
                            isActiveSort && TABLE_HEAD_STYLES.sortIconActive,
                        )}
                    />
                </span>
            ) : (
                children
            )}
        </th>
    )
}

TableHead.displayName = 'Table.Head'

export default TableHead
