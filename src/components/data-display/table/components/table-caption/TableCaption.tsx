import type { FC } from 'react'

import { tableCaptionClass } from '@components/data-display/table/components/table-caption/TableCaption.css.ts'
import type { TableCaptionProps } from '@components/data-display/table/components/table-caption/types/TableCaption.props.ts'
import { cn } from '@utils/cn.ts'

const TableCaption: FC<TableCaptionProps> = ({ className, ref, ...props }) => (
    <caption
        ref={ref}
        className={cn(tableCaptionClass, className)}
        {...props}
    />
)

TableCaption.displayName = 'TableCaption'

export default TableCaption
