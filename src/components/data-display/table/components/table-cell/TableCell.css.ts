import { style, type StyleRule } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { TABLE_STYLES } from '@components/data-display/table/Table.css.ts'
import type { TableCellAlign } from '@components/data-display/table/types'

const cellRecipe = recipe({
    base: {
        paddingInline: vars.space[16],
        paddingBlock: TABLE_STYLES.cellPaddingBlockVar,
        verticalAlign: 'middle',
        color: vars.color.text.primary,
    },
    variants: {
        align: {
            left: {
                textAlign: 'left',
            },
            center: {
                textAlign: 'center',
            },
            right: {
                textAlign: 'right',
            },
        } satisfies Record<TableCellAlign, StyleRule>,
    },
    defaultVariants: {
        align: 'left',
    },
})

/**
     * Enables text truncation inside a cell. The parent column must have a
     * constrained width (e.g. via `style={{ maxWidth: '12rem' }}`) for
     * `text-overflow: ellipsis` to take effect in a table context.
     */
const truncate = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
})

/**
     * Right-aligns content and enables tabular (monospaced) number rendering —
     * ideal for numeric columns such as amounts, counts or IDs.
     * Overrides the `align` variant when both are applied.
     */
const numeric = style({
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
})

/** Data-cell customization classes; numeric alignment takes precedence over align. */
export const TABLE_CELL_STYLES = {
    recipe: cellRecipe,
    truncate,
    numeric,
}
