import { createVar, globalStyle, style, type StyleRule } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import type { TableSize } from '@components/data-display/table/types'

/**
 * CSS custom property seeded on <table>, inherited by every <th>/<td>
 * descendant — lets the `size` variant control cell density from one place.
 */
const cellPaddingBlockVar = createVar()

const tableBase = style({
    width: '100%',
    captionSide: 'bottom',
    fontSize: vars.fontSize[14],
    borderCollapse: 'collapse',
    vars: {
        [cellPaddingBlockVar]: vars.space[8],
    },
})

globalStyle(`${tableBase}[data-striped="true"] tbody tr:nth-child(even):not([data-intent])`, {
    backgroundColor: vars.color.surface.muted,
})

globalStyle(`${tableBase}[data-bordered="true"] th, ${tableBase}[data-bordered="true"] td`, {
    border: `1px solid ${vars.color.border.main}`,
})

const wrapper = style({})

const tableRecipe = recipe({
    base: tableBase,
    variants: {
        size: {
            sm: {
                vars: {
                    [cellPaddingBlockVar]: vars.space[4],
                },
            },
            md: {
                vars: {
                    [cellPaddingBlockVar]: vars.space[8],
                },
            },
            lg: {
                vars: {
                    [cellPaddingBlockVar]: vars.space[12],
                },
            },
        } satisfies Record<TableSize, StyleRule>,
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
    defaultVariants: {
        size: 'md',
    },
})

/** Table customization classes and inherited cell-density variable. */
export const TABLE_STYLES = {
    cellPaddingBlockVar,
    wrapper,
    recipe: tableRecipe,
}
