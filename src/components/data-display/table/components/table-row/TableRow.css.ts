import { recipe } from '@vanilla-extract/recipes'
import type { StyleRule } from '@vanilla-extract/css'

import type { TableRowIntent } from '@components/data-display/table/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

const rowRecipe = recipe({
    base: {
        borderBottom: `1px solid ${vars.color.border.main}`,
        transition: `background-color ${vars.duration.fast} ${vars.easing.standard}`,
    },
    variants: {
        hoverable: {
            true: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.surface.muted,
                    },
                },
            },
        },
        selectable: {
            true: {
                cursor: 'pointer',
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.surface.muted,
                    },
                    '&:focus-visible': {
                        outline: 'none',
                        boxShadow: `inset 0 0 0 2px ${vars.color.focusRing}`,
                    },
                },
            },
        },
        selected: {
            true: {
                backgroundColor: vars.color.primary.subtle,
            },
        },
        intent: {
            success: {
                backgroundColor: vars.color.success.subtle,
                color: vars.color.success.subtleForeground,
            },
            warning: {
                backgroundColor: vars.color.warning.subtle,
                color: vars.color.warning.subtleForeground,
            },
            destructive: {
                backgroundColor: vars.color.danger.subtle,
                color: vars.color.danger.subtleForeground,
            },
            info: {
                backgroundColor: vars.color.info.subtle,
                color: vars.color.info.subtleForeground,
            },
        } satisfies Record<TableRowIntent, StyleRule>,
    },
    compoundVariants: [
        {
            variants: {
                hoverable: true,
                intent: 'success',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.success.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                hoverable: true,
                intent: 'warning',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.warning.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                hoverable: true,
                intent: 'destructive',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.danger.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                hoverable: true,
                intent: 'info',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.info.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                selectable: true,
                intent: 'success',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.success.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                selectable: true,
                intent: 'warning',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.warning.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                selectable: true,
                intent: 'destructive',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.danger.subtleHover,
                    },
                },
            },
        },
        {
            variants: {
                selectable: true,
                intent: 'info',
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.color.info.subtleHover,
                    },
                },
            },
        },
    ],
    defaultVariants: {
        hoverable: false,
        selected: false,
    },
})

/** Row customization recipe for selection, hover, focus, and semantic intent. */
export const TABLE_ROW_STYLES = {
    recipe: rowRecipe,
}
