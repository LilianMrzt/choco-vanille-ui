import { memo, type FC } from 'react'

import type { TableColGroupProps } from '@components/data-display/table/components/table-col-group/types/TableColGroup.props.ts'

const TableColGroup: FC<TableColGroupProps> = memo(({ ref, ...props }) => (
    <colgroup
        ref={ref}
        {...props}
    />
))

TableColGroup.displayName = 'Table.ColGroup'

export default TableColGroup
