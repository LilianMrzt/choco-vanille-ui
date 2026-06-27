import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { cellPaddingBlockVar } from '@components/data-display/table/Table.css.ts'

export const tableCellRecipe = recipe({
    base: {
        paddingInline: vars.space.lg,
        paddingBlock: cellPaddingBlockVar,
        verticalAlign: 'middle',
        color: vars.color.foreground,
    },
    variants: {
        align: {
            left: { textAlign: 'left' },
            center: { textAlign: 'center' },
            right: { textAlign: 'right' },
        },
    },
    defaultVariants: { align: 'left' },
})

export type TableCellRecipeVariants = NonNullable<RecipeVariants<typeof tableCellRecipe>>

/**
 * Enables text truncation inside a cell. The parent column must have a
 * constrained width (e.g. via `style={{ maxWidth: '12rem' }}`) for
 * `text-overflow: ellipsis` to take effect in a table context.
 */
export const tableCellTruncateClass = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
})

/**
 * Right-aligns content and enables tabular (monospaced) number rendering —
 * ideal for numeric columns such as amounts, counts or IDs.
 * Overrides the `align` variant when both are applied.
 */
export const tableCellNumericClass = style({
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
})
