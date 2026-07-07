import type { FC } from 'react'

import { TABLE_CAPTION_STYLES } from '@components/data-display/table/components/table-caption/styles/TableCaption.css.ts'
import type { TableCaptionProps } from '@components/data-display/table/components/table-caption/types/TableCaption.props.ts'
import { cn } from '@utils/cn.ts'

const TableCaption: FC<TableCaptionProps> = ({ className, ref, ...props }) => (
    <caption
        ref={ref}
        className={cn(TABLE_CAPTION_STYLES.root, className)}
        {...props}
    />
)

TableCaption.displayName = 'Table.Caption'

export default TableCaption
