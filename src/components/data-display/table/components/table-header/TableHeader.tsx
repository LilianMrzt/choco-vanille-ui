import { memo, type FC } from 'react'

import { TABLE_HEADER_STYLES } from '@components/data-display/table/components/table-header/styles/TableHeader.css.ts'
import type { TableHeaderProps } from '@components/data-display/table/components/table-header/types/TableHeader.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * `<thead>` slot for `Table`. Applies header base styles and forwards all
 * native `<thead>` attributes.
 */
const TableHeader: FC<TableHeaderProps> = memo(({ className, ref, ...props }) => (
    <thead
        ref={ref}
        className={cn(TABLE_HEADER_STYLES.root, className)}
        {...props}
    />
))

TableHeader.displayName = 'Table.Header'

export default TableHeader
