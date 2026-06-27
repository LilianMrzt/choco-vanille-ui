import { style } from '@vanilla-extract/css'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { cellPaddingBlockVar } from '@components/data-display/table/Table.css.ts'

export const tableHeadRecipe = recipe({
    base: {
        height: '2.75rem',
        paddingInline: vars.space.lg,
        paddingBlock: cellPaddingBlockVar,
        verticalAlign: 'middle',
        fontSize: vars.fontSize.xs,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.mutedForeground,
        letterSpacing: vars.letterSpacing.wide,
        whiteSpace: 'nowrap',
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

export type TableHeadRecipeVariants = NonNullable<RecipeVariants<typeof tableHeadRecipe>>

/** Applied when `sortable` is true. Signals the column is interactive. */
export const tableHeadSortableClass = style({
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        '&:hover': {
            color: vars.color.foreground,
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.ring}`,
            outlineOffset: '2px',
            borderRadius: vars.radius.xs,
        },
    },
})

/** Wraps the cell content + sort icon in an inline flex row. */
export const tableHeadSortWrapperClass = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.space.xs,
})

/** Sort icon at rest — muted (used for `sortDirection="none"`). */
export const tableHeadSortIconClass = style({
    flexShrink: 0,
    opacity: 0.4,
    transition: `opacity ${vars.duration.fast} ${vars.easing.standard}`,
})

/** Sort icon when a direction is active (`asc` or `desc`). */
export const tableHeadSortIconActiveClass = style({
    opacity: 1,
})
