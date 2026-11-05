import type { FC } from 'react'

import { TABLE_CAPTION_STYLES } from '@components/data-display/table/components/table-caption/TableCaption.css.ts'
import type { TableCaptionProps } from '@components/data-display/table/components/table-caption/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Provides a visible accessible table name through `Table.Caption`.
 * The caption appears below the table by default. Keep its text descriptive.
 * Native attributes, events, className, style, and ref target the caption.
 *
 * @param props - Native caption attributes and descriptive children.
 * @param props.className - Consumer class merged with the caption class.
 * @param props.ref - Ref forwarded to the caption element.
 * @param props.children - Visible descriptive table name.
 * @returns A semantic table caption.
 * @example
 * <Table.Caption>Recent invoices</Table.Caption>
 */
const TableCaption: FC<TableCaptionProps> = ({ className, ref, ...props }) => (
    <caption
        ref={ref}
        className={cn(TABLE_CAPTION_STYLES.root, className)}
        {...props}
    />
)

TableCaption.displayName = 'Table.Caption'

export default TableCaption
