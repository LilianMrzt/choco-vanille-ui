import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_ROW_STYLES = {
    recipe: recipe({
        base: {
            borderBottom: `1px solid ${vars.color.border}`,
            transition: `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        },
        variants: {
            hoverable: {
                true: {
                    selectors: {
                        '&:hover': {
                            backgroundColor: vars.color.surfaceMuted,
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
                            backgroundColor: vars.color.surfaceMuted,
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
                    backgroundColor: vars.color.primarySubtle,
                },
            },
            intent: {
                success: {
                    backgroundColor: vars.color.successSubtle,
                    color: vars.color.successSubtleForeground,
                },
                warning: {
                    backgroundColor: vars.color.warningSubtle,
                    color: vars.color.warningSubtleForeground,
                },
                destructive: {
                    backgroundColor: vars.color.dangerSubtle,
                    color: vars.color.dangerSubtleForeground,
                },
                info: {
                    backgroundColor: vars.color.infoSubtle,
                    color: vars.color.infoSubtleForeground,
                },
            },
        },
        compoundVariants: [
            {
                variants: { hoverable: true, intent: 'success' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.successSubtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'warning' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.warningSubtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'destructive' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.dangerSubtleHover } } },
            },
            {
                variants: { hoverable: true, intent: 'info' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.infoSubtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'success' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.successSubtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'warning' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.warningSubtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'destructive' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.dangerSubtleHover } } },
            },
            {
                variants: { selectable: true, intent: 'info' },
                style: { selectors: { '&:hover': { backgroundColor: vars.color.infoSubtleHover } } },
            },
        ],
        defaultVariants: {
            hoverable: false,
            selected: false,
        },
    }),
}
