import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

/**
 * CSS custom property seeded on <table>, inherited by every <th>/<td>
 * descendant — lets the `size` variant control cell density from one place.
 */
const cellPaddingBlockVar = createVar()

export const TABLE_STYLES = {
    cellPaddingBlockVar,
    wrapper: style({
        position: 'relative',
        width: '100%',
        overflowX: 'auto',
    }),
    /**
     * Applied to <table> when `striped` is true.
     * Skips rows that carry an explicit `data-intent` attribute so intent row
     * colours always win over the stripe background.
     */
    striped: style({}),
    /**
     * Applied to <table> when `bordered` is true.
     * Adds borders on all four sides of every header and data cell.
     */
    bordered: style({}),
    /** Applied to <table> when `fixed` is true. Enables `table-layout: fixed`. */
    fixed: style({
        tableLayout: 'fixed',
    }),
    recipe: recipe({
        base: {
            width: '100%',
            captionSide: 'bottom',
            fontSize: vars.fontSize.sm,
            borderCollapse: 'collapse',
            vars: { [cellPaddingBlockVar]: vars.space.sm },
        },
        variants: {
            size: {
                sm: { vars: { [cellPaddingBlockVar]: vars.space.xs } },
                md: { vars: { [cellPaddingBlockVar]: vars.space.sm } },
                lg: { vars: { [cellPaddingBlockVar]: vars.space.md } },
            },
        },
        defaultVariants: { size: 'md' },
    }),
}

export type TableRecipeVariants = NonNullable<RecipeVariants<typeof TABLE_STYLES.recipe>>

globalStyle(`${TABLE_STYLES.striped} tbody tr:nth-child(even):not([data-intent])`, {
    backgroundColor: vars.color.muted,
})
globalStyle(`${TABLE_STYLES.bordered} th, ${TABLE_STYLES.bordered} td`, {
    border: `1px solid ${vars.color.border}`,
})
