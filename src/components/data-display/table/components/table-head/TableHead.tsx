import type { FC, KeyboardEvent } from 'react'

import Icon from '@components/foundation/icon/Icon.tsx'
import Flex from '@components/layout/flex/Flex.tsx'
import { TABLE_HEAD_STYLES } from '@components/data-display/table/components/table-head/TableHead.css.ts'
import type { TableHeadProps } from '@components/data-display/table/components/table-head/types/index.ts'
import { ARIA_SORT_VALUES, SORT_ICONS } from '@components/data-display/table/components/table-head/constants'
import { cn } from '@utils/cn.ts'

/**
 * Labels a column or row through `Table.Head`. Defaults to left alignment and
 * scope="col"; native scope and tabIndex can override those defaults.
 * Sortable headers activate on Enter/Space through onClick; sorting and the
 * current sortDirection remain consumer-owned. Consumer onKeyDown runs first
 * and preventDefault cancels keyboard activation. An explicit sortDirection
 * supplies aria-sort and a decorative indicator, even without sortable.
 * Provide descriptive children and set a direction only on the sorted column.
 * Native attributes, events, className, style, and ref target the th.
 *
 * @param props - Native header-cell attributes and sorting presentation.
 * @param props.align - Header text alignment; defaults to `left`.
 * @param props.sortable - Enables focus and Enter/Space activation of onClick; defaults to false.
 * @param props.sortDirection - Consumer-owned sort state controlling aria-sort and the decorative indicator.
 * @param props.children - Descriptive column or row heading content.
 * @param props.className - Consumer class merged with the header-cell classes.
 * @param props.ref - Ref forwarded to the th element.
 * @param props.onKeyDown - Native handler called before keyboard activation; preventDefault cancels activation.
 * @returns A semantic header cell with an optional sort indicator.
 * @example
 * <Table.Head sortable sortDirection="asc" onClick={handleSort}>Invoice</Table.Head>
 */
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

    /**
     * Forwards the native key event and activates an uncancelled sortable header.
     * @param event - Header-cell keyboard event; Enter and Space activate onClick.
     * @returns Nothing.
     * @example
     * <th onKeyDown={handleKeyDown}>Amount</th>
     */
    const handleKeyDown = (event: KeyboardEvent<HTMLTableCellElement>): void => {
        onKeyDown?.(event)

        if (sortable && !event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            event.currentTarget.click()
        }
    }

    return (
        <th
            scope={'col'}
            tabIndex={sortable ? 0 : undefined}
            {...props}
            ref={ref}
            aria-sort={sortDirection === undefined ? props['aria-sort'] : ARIA_SORT_VALUES[sortDirection]}
            onKeyDown={sortable || onKeyDown ? handleKeyDown : undefined}
            className={cn(
                TABLE_HEAD_STYLES.recipe({ align }),
                sortable && TABLE_HEAD_STYLES.sortable,
                className,
            )}
        >
            {sortDirection !== undefined ? (
                <Flex
                    alignItems={'center'}
                    as={'span'}
                    className={TABLE_HEAD_STYLES.sortWrapper}
                    gap={4}
                    inline
                >
                    {children}
                    <Icon
                        icon={SORT_ICONS[sortDirection]}
                        size={12}
                        className={cn(
                            TABLE_HEAD_STYLES.sortIcon,
                            isActiveSort && TABLE_HEAD_STYLES.sortIconActive,
                        )}
                    />
                </Flex>
            ) : (
                children
            )}
        </th>
    )
}

TableHead.displayName = 'Table.Head'

export default TableHead
