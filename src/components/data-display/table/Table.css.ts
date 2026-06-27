import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

/**
 * CSS custom property seeded on <table>, inherited by every <th>/<td>
 * descendant — lets the `size` variant control cell density from one place.
 */
export const cellPaddingBlockVar = createVar()

export const tableWrapperClass = style({
    position: 'relative',
    width: '100%',
    overflowX: 'auto',
})

/**
 * Applied to <table> when `striped` is true.
 * Skips rows that carry an explicit `data-intent` attribute so intent row
 * colours always win over the stripe background.
 */
export const tableStripedClass = style({})
globalStyle(`${tableStripedClass} tbody tr:nth-child(even):not([data-intent])`, {
    backgroundColor: vars.color.muted,
})

/**
 * Applied to <table> when `bordered` is true.
 * Adds borders on all four sides of every header and data cell.
 */
export const tableBorderedClass = style({})
globalStyle(`${tableBorderedClass} th, ${tableBorderedClass} td`, {
    border: `1px solid ${vars.color.border}`,
})

/** Applied to <table> when `fixed` is true. Enables `table-layout: fixed`. */
export const tableFixedClass = style({
    tableLayout: 'fixed',
})

export const tableRecipe = recipe({
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
})

export type TableRecipeVariants = NonNullable<RecipeVariants<typeof tableRecipe>>
