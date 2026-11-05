import type { TableSize, TableCellAlign } from '@components/data-display/table/types'

/** Available size values for the Table component. */
export const TABLE_SIZES = ['sm', 'md', 'lg'] as const satisfies readonly TableSize[]

/** Available alignment values for TableHead and TableCell. */
export const TABLE_CELL_ALIGNS = ['left', 'center', 'right'] as const satisfies readonly TableCellAlign[]
