import type { FC } from 'react'

import { TABLE_FOOTER_STYLES } from '@components/data-display/table/components/table-footer/styles/TableFooter.css.ts'
import type { TableFooterProps } from '@components/data-display/table/components/table-footer/types/TableFooter.props.ts'
import { cn } from '@utils/cn.ts'

const TableFooter: FC<TableFooterProps> = ({ className, ref, ...props }) => (
    <tfoot
        ref={ref}
        className={cn(TABLE_FOOTER_STYLES.root, className)}
        {...props}
    />
)

TableFooter.displayName = 'Table.Footer'

export default TableFooter
