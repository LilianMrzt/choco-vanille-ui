import type { IconComponent } from '@components/foundation/icon/types/Icon.types.ts'
import type { TableSortDirection } from '@components/data-display/table/components/table-head/types'
import SortAscIcon from '@resources/asset/SortAscIcon.svg?react'
import SortDescIcon from '@resources/asset/SortDescIcon.svg?react'
import SortIcon from '@resources/asset/SortIcon.svg?react'

/** Decorative icons for each supported sort direction. */
export const SORT_ICONS = {
    none: SortIcon,
    asc: SortAscIcon,
    desc: SortDescIcon,
} satisfies Record<TableSortDirection, IconComponent>

/** Native aria-sort values corresponding to the public direction vocabulary. */
export const ARIA_SORT_VALUES = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none',
} as const satisfies Record<TableSortDirection, 'ascending' | 'descending' | 'none'>
