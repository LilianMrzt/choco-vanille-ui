import type { FC } from 'react'

import { TABLE_HEADER_STYLES } from '@components/data-display/table/components/table-header/TableHeader.css.ts'
import type { TableHeaderProps } from '@components/data-display/table/components/table-header/types/TableHeader.props.ts'
import { cn } from '@utils/cn.ts'

const TableHeader: FC<TableHeaderProps> = ({ className, ref, ...props }) => (
    <thead
        ref={ref}
        className={cn(TABLE_HEADER_STYLES.root, className)}
        {...props}
    />
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
