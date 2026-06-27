import type * as React from 'react'

export type TableColProps = Omit<React.ColHTMLAttributes<HTMLTableColElement>, 'width'> &
    React.RefAttributes<HTMLTableColElement> & {
        /**
         * Column width — any valid CSS value (`'200px'`, `'25%'`, `'12rem'`).
         * Requires `fixed` on the parent `Table` to take effect.
         */
        width?: React.CSSProperties['width']
        /**
         * Minimum column width — any valid CSS value.
         * Useful to prevent columns from collapsing below a readable size.
         */
        minWidth?: React.CSSProperties['minWidth']
        /**
         * Maximum column width.
         * Prevents a flexible column from growing too wide.
         */
        maxWidth?: React.CSSProperties['maxWidth']
    }
