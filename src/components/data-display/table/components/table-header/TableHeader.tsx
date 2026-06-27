import type { FC } from 'react'

import { tableHeaderClass } from '@components/data-display/table/components/table-header/TableHeader.css.ts'
import type { TableHeaderProps } from '@components/data-display/table/components/table-header/types/TableHeader.props.ts'
import { cn } from '@utils/cn.ts'

const TableHeader: FC<TableHeaderProps> = ({ className, ref, ...props }) => (
    <thead
        ref={ref}
        className={cn(tableHeaderClass, className)}
        {...props}
    />
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
