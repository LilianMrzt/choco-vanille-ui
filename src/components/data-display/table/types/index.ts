import type { ComponentPropsWithRef } from 'react'

/** Table density: small (4px), medium (8px), or large (12px) block cell padding. */
export type TableSize = 'sm' | 'md' | 'lg'

/** Horizontal text alignment for native header and data cells. */
export type TableCellAlign = 'left' | 'center' | 'right'

/** Semantic row background; provide text as well as color to convey meaning. */
export type TableRowIntent = 'success' | 'warning' | 'destructive' | 'info'

/** Native table attributes and density/layout options; the ref targets the table. */
export type TableProps = Readonly<ComponentPropsWithRef<'table'> & {
    /** Cell density. Defaults to `md`. */
    size?: TableSize
    /** Alternating background on even body rows without an intent. Defaults to false. */
    striped?: boolean
    /** Borders on every header and data cell. Defaults to false. */
    bordered?: boolean
    /** Fixed column layout for predictable widths and truncation. Defaults to false. */
    fixed?: boolean
}>
