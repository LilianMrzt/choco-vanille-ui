import type { ComponentPropsWithRef } from 'react'

import type { TableCellAlign } from '@components/data-display/table/types'

/** Native td attributes and data presentation; the ref targets the data cell. */
export type TableCellProps = Readonly<Omit<ComponentPropsWithRef<'td'>, 'align'> & {
        /** Horizontal content alignment. Defaults to left. */
        align?: TableCellAlign
        /**
         * Right-aligns content with tabular numbers. Defaults to false.
         * Takes precedence over the `align` variant when both are set.
         */
        numeric?: boolean
        /**
         * Clips overflowing text with an ellipsis. Defaults to false. The column must have a
         * constrained width (e.g. `style={{ maxWidth: '12rem' }}`) for
         * truncation to activate in table context.
         */
        truncate?: boolean
}>
