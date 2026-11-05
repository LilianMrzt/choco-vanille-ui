import type { FC } from 'react'

import type { TableColProps } from '@components/data-display/table/components/table-col/types/index.ts'

/**
 * Defines a column inside `Table.ColGroup`. Width constraints accept CSS
 * values; use fixed table layout for predictable widths. Browser table
 * layout rules determine whether minimum/maximum constraints take effect.
 * Native attributes and ref target the col. Consumer style overrides the
 * width props. Columns are structural and do not provide accessible names.
 *
 * @param props - Native column attributes and CSS width constraints.
 * @param props.width - Optional CSS column width.
 * @param props.minWidth - Optional CSS minimum width, subject to browser table layout.
 * @param props.maxWidth - Optional CSS maximum width, subject to browser table layout.
 * @param props.style - Consumer CSS overrides taking precedence over width constraints.
 * @param props.ref - Ref forwarded to the col element.
 * @returns A semantic column definition.
 * @example
 * <Table.Col width="25%" />
 */
const TableCol: FC<TableColProps> = ({ width, minWidth, maxWidth, style, ref, ...props }) => (
    <col
        ref={ref}
        style={{ width, minWidth, maxWidth, ...style }}
        {...props}
    />
)

TableCol.displayName = 'Table.Col'

export default TableCol
