import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_ROW_STYLES = {
    recipe: recipe({
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
            /**
             * Makes the row visually interactive: adds `cursor: pointer` and a
             * hover background. Use together with `onClick` and `selected` to build
             * a row-selection pattern without extra wrapper components.
             * Implies `hoverable` behaviour — there is no need to pass both.
             */
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
            },
        },
        compoundVariants: [
            {
                variants: { hoverable: true, intent: 'success' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.success.subtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'warning' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.warning.subtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'destructive' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.danger.subtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'info' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.info.subtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'success' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.success.subtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'warning' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.warning.subtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'destructive' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.danger.subtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'info' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.info.subtleHover } } },
            },
        ],
        defaultVariants: {
            hoverable: false,
            selected: false,
        },
    }),
}
