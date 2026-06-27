import type { FC } from 'react'

import { tableFooterClass } from '@components/data-display/table/components/table-footer/TableFooter.css.ts'
import type { TableFooterProps } from '@components/data-display/table/components/table-footer/types/TableFooter.props.ts'
import { cn } from '@utils/cn.ts'

const TableFooter: FC<TableFooterProps> = ({ className, ref, ...props }) => (
    <tfoot
        ref={ref}
        className={cn(tableFooterClass, className)}
        {...props}
    />
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
