import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * CSS custom property seeded on <table>, inherited by every <th>/<td>
 * descendant — lets the `size` variant control cell density from one place.
 */
const cellPaddingBlockVar = createVar()

const tableBase = style({
    width: '100%',
    captionSide: 'bottom',
    fontSize: vars.fontSize.sm,
    borderCollapse: 'collapse',
    vars: { [cellPaddingBlockVar]: vars.space.sm },
})

globalStyle(`${tableBase}[data-striped="true"] tbody tr:nth-child(even):not([data-intent])`, {
    backgroundColor: vars.color.surface.muted,
})

globalStyle(`${tableBase}[data-bordered="true"] th, ${tableBase}[data-bordered="true"] td`, {
    border: `1px solid ${vars.color.border.main}`,
})

export const TABLE_STYLES = {
    cellPaddingBlockVar,
    wrapper: style({
        position: 'relative',
        width: '100%',
        overflowX: 'auto',
    }),
    recipe: recipe({
        base: tableBase,
        variants: {
            size: {
                sm: { vars: { [cellPaddingBlockVar]: vars.space.xs } },
                md: { vars: { [cellPaddingBlockVar]: vars.space.sm } },
                lg: { vars: { [cellPaddingBlockVar]: vars.space.md } },
            },
            striped: {
                true: {},
            },
            bordered: {
                true: {},
            },
            fixed: {
                true: {
                    tableLayout: 'fixed',
                },
            },
        },
        defaultVariants: { size: 'md' },
    }),
}
