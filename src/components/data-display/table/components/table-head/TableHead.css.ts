import { style, type StyleRule } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { TABLE_STYLES } from '@components/data-display/table/Table.css.ts'
import type { TableCellAlign } from '@components/data-display/table/types'

const headRecipe = recipe({
    base: {
        height: '2.75rem',
        paddingInline: vars.space[16],
        paddingBlock: TABLE_STYLES.cellPaddingBlockVar,
        verticalAlign: 'middle',
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.medium,
        color: vars.color.surface.mutedForeground,
        letterSpacing: '0.025em',
        whiteSpace: 'nowrap',
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

/** Applied when `sortable` is true. Signals the column is interactive. */
const sortable = style({
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        '&:hover': {
            color: vars.color.text.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: '2px',
            borderRadius: vars.radius[4],
        },
    },
})

/** Wraps the cell content + sort icon in an inline flex row. */
const sortWrapper = style({})

/** Sort icon at rest — muted (used for `sortDirection="none"`). */
const sortIcon = style({
    flexShrink: 0,
    opacity: 0.4,
    transition: `opacity ${vars.duration.fast} ${vars.easing.standard}`,
})

/** Sort icon when a direction is active (`asc` or `desc`). */
const sortIconActive = style({
    opacity: 1,
})

/** Header-cell customization classes, including keyboard focus and sort indicators. */
export const TABLE_HEAD_STYLES = {
    recipe: headRecipe,
    sortable,
    sortWrapper,
    sortIcon,
    sortIconActive,
}
