import type { FC } from 'react'

import { tableBodyClass } from '@components/data-display/table/components/table-body/TableBody.css.ts'
import type { TableBodyProps } from '@components/data-display/table/components/table-body/types/TableBody.props.ts'
import { cn } from '@utils/cn.ts'

const TableBody: FC<TableBodyProps> = ({ className, ref, ...props }) => (
    <tbody
        ref={ref}
        className={cn(tableBodyClass, className)}
        {...props}
    />
)

TableBody.displayName = 'TableBody'

export default TableBody
