import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const STEPPER_STYLES = {
    root: style({
        width: '100%',
    }),
    list: style({
        display: 'flex',
        gap: vars.space.md,
        padding: 0,
        margin: 0,
        listStyle: 'none',
    }),
    listHorizontal: style({
        flexDirection: 'row',
        alignItems: 'flex-start',
    }),
    listVertical: style({
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 0,
    }),
    item: style({
        display: 'flex',
        flex: '0 1 auto',
        minWidth: 0,
        alignItems: 'flex-start',
        gap: vars.space.sm,
        position: 'relative',
    }),
    itemVertical: style({
        flex: 'none',
    }),
    marker: style({
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: vars.radius.full,
        border: `1px solid ${vars.color.borderStrong}`,
        backgroundColor: vars.color.card,
        color: vars.color.textSecondary,
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: 1,
        textAlign: 'center',
    }),
    markerValue: style({
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    markerCurrent: style({
        backgroundColor: vars.color.primary,
        borderColor: vars.color.primary,
        color: vars.color.primaryForeground,
        boxShadow: `0 0 0 3px ${vars.color.primarySubtle}`,
    }),
    markerCompleted: style({
        backgroundColor: vars.color.successSubtle,
        borderColor: vars.color.success,
        color: vars.color.successSubtleForeground,
    }),
    content: style({
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column',
        gap: vars.space.xxs,
        paddingTop: vars.space.xxs,
    }),
    contentCentered: style({
        paddingTop: 0,
    }),
    itemContentCentered: style({
        alignSelf: 'center',
    }),
    label: style({
        color: vars.color.text,
        fontWeight: vars.fontWeight.medium,
        textAlign: 'start',
    }),
    description: style({
        color: vars.color.textSecondary,
        textAlign: 'start',
    }),
    connector: style({
        display: 'block',
        width: '100%',
        height: '1px',
    }),
    connectorItem: style({
        display: 'flex',
        flex: 1,
        minWidth: 0,
        height: '1px',
        marginTop: vars.space.md,
        alignItems: 'flex-start',
    }),
    connectorItemVertical: style({
        flex: 'none',
        width: '100%',
        height: vars.space.lg2,
        marginLeft: 0,
        marginTop: vars.space.sm,
        marginBottom: vars.space.md,
        paddingLeft: vars.space.md2,
    }),
    connectorVertical: style({
        display: 'block',
        flex: 'none',
        width: '1px',
        height: '100%',
        marginTop: 0,
    }),
    interactive: style({
        padding: 0,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'start',
        transition: 'opacity 150ms ease',
        selectors: {
            '&:hover:not(:disabled)': {
                opacity: 0.75,
            },
        },
    }),
    disabled: style({
        cursor: 'not-allowed',
        opacity: 0.6,
    }),
}
