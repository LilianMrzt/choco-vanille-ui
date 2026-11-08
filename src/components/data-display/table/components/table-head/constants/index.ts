import { SORT_ASC_ICON as SortAscIcon, SORT_DESC_ICON as SortDescIcon, SORT_ICON as SortIcon } from '@constants/icon-registry'
import type { IconifyIcon } from '@components/foundation/icon'
import type { TableSortDirection } from '@components/data-display/table/components/table-head/types'

/** Decorative icons for each supported sort direction. */
export const SORT_ICONS = {
    none: SortIcon,
    asc: SortAscIcon,
    desc: SortDescIcon,
} satisfies Record<TableSortDirection, IconifyIcon>

/** Native aria-sort values corresponding to the public direction vocabulary. */
export const ARIA_SORT_VALUES = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none',
} as const satisfies Record<TableSortDirection, 'ascending' | 'descending' | 'none'>
