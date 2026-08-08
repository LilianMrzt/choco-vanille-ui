import { memo, type FC } from 'react'

import type { TableColGroupProps } from '@components/data-display/table/components/table-col-group/types/TableColGroup.props.ts'

/**
 * `<colgroup>` slot for `Table`. Groups `Table.Col` elements and forwards
 * all native `<colgroup>` attributes.
 */
const TableColGroup: FC<TableColGroupProps> = memo(({ ref, ...props }) => (
    <colgroup
        ref={ref}
        {...props}
    />
))

TableColGroup.displayName = 'Table.ColGroup'

export default TableColGroup
