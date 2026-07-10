import { memo, type FC } from 'react'

import { TABLE_BODY_STYLES } from '@components/data-display/table/components/table-body/styles/TableBody.css.ts'
import type { TableBodyProps } from '@components/data-display/table/components/table-body/types/TableBody.props.ts'
import { cn } from '@utils/cn.ts'

const TableBody: FC<TableBodyProps> = memo(({ className, ref, ...props }) => (
    <tbody
        ref={ref}
        className={cn(TABLE_BODY_STYLES.root, className)}
        {...props}
    />
))

TableBody.displayName = 'Table.Body'

export default TableBody
