import type { ComponentPropsWithRef } from 'react'

import type { TableCellAlign } from '@components/data-display/table/types'

/** Public sorting direction, independent of styling and native ARIA spelling. */
export type TableSortDirection = 'asc' | 'desc' | 'none'

/** Native th attributes and sorting presentation; the ref targets the header cell. */
export type TableHeadProps = Readonly<Omit<ComponentPropsWithRef<'th'>, 'align'> & {
        /** Horizontal content alignment. Defaults to left. */
        align?: TableCellAlign
        /**
         * Enables focus and Enter/Space activation. Defaults to false.
         * Supply onClick to sort; onKeyDown can preventDefault to cancel activation.
         */
        sortable?: boolean
        /**
         * Consumer-owned sort direction. Omitted by default (no indicator).
         * Overrides native aria-sort when set and renders a decorative indicator.
         */
        sortDirection?: TableSortDirection
}>
