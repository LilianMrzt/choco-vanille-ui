import type { FC } from 'react'

import type { TableColGroupProps } from '@components/data-display/table/components/table-col-group/types/index.ts'

/**
 * Groups column definitions through `Table.ColGroup`. Place before table
 * sections; use Table.Col children or the native span attribute, not both.
 * Native attributes, events, className, style, and ref target the colgroup.
 * This structural slot does not supply an accessible table name.
 *
 * @param props - Native column-group attributes.
 * @param props.ref - Ref forwarded to the colgroup element.
 * @param props.children - Explicit column definitions; do not combine them with a native span value.
 * @returns A semantic column group.
 * @example
 * <Table.ColGroup><Table.Col width="25%" /><Table.Col /></Table.ColGroup>
 */
const TableColGroup: FC<TableColGroupProps> = ({ ref, ...props }) => (
    <colgroup
        ref={ref}
        {...props}
    />
)

TableColGroup.displayName = 'Table.ColGroup'

export default TableColGroup
