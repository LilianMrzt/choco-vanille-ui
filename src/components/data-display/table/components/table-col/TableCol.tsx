import type { FC } from 'react'

import type { TableColProps } from '@components/data-display/table/components/table-col/types/TableCol.props.ts'

const TableCol: FC<TableColProps> = ({ width, minWidth, maxWidth, style, ref, ...props }) => (
    <col
        ref={ref}
        style={{ width, minWidth, maxWidth, ...style }}
        {...props}
    />
)

TableCol.displayName = 'Table.Col'

export default TableCol
