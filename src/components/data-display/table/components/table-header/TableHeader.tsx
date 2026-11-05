import type { FC } from 'react'

import { TABLE_HEADER_STYLES } from '@components/data-display/table/components/table-header/TableHeader.css.ts'
import type { TableHeaderProps } from '@components/data-display/table/components/table-header/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Groups header rows in `Table.Header` with a bottom divider. Use Table.Head
 * cells with descriptive labels so data columns can be identified.
 * Native attributes, events, className, style, and ref target the thead.
 *
 * @param props - Native header-section attributes.
 * @param props.className - Consumer class merged with the header-section class.
 * @param props.ref - Ref forwarded to the thead element.
 * @param props.children - Header rows containing descriptive Table.Head cells.
 * @returns A semantic table header.
 * @example
 * <Table.Header><Table.Row><Table.Head>Invoice</Table.Head></Table.Row></Table.Header>
 */
const TableHeader: FC<TableHeaderProps> = ({ className, ref, ...props }) => (
    <thead
        ref={ref}
        className={cn(TABLE_HEADER_STYLES.root, className)}
        {...props}
    />
)

TableHeader.displayName = 'Table.Header'

export default TableHeader
