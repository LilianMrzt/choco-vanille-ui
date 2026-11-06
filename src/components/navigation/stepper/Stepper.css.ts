import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const STEPPER_STYLES = {
    root: style({
        width: '100%',
    }),
    list: style({
        display: 'flex',
        gap: vars.space[12],
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
        gap: vars.space[8],
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
        border: `1px solid ${vars.color.border.strong}`,
        backgroundColor: vars.color.surface.main,
        color: vars.color.text.secondary,
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.semibold,
        lineHeight: 1,
        textAlign: 'center',
    }),
    markerSmall: style({
        width: '1.5rem',
        height: '1.5rem',
        fontSize: vars.fontSize[12],
    }),
    markerValue: style({
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    markerCurrent: style({
        backgroundColor: vars.color.primary.main,
        borderColor: vars.color.primary.main,
        color: vars.color.primary.foreground,
        boxShadow: `0 0 0 3px ${vars.color.primary.subtle}`,
    }),
    markerCompleted: style({
        backgroundColor: vars.color.success.subtle,
        borderColor: vars.color.success.main,
        color: vars.color.success.subtleForeground,
    }),
    content: style({
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column',
        gap: vars.space[2],
        paddingTop: vars.space[2],
    }),
    contentCentered: style({
        paddingTop: 0,
    }),
    contentSmall: style({
        gap: 0,
        paddingTop: 0,
    }),
    itemContentCentered: style({
        alignSelf: 'center',
    }),
    label: style({
        color: vars.color.text.primary,
        fontWeight: vars.fontWeight.medium,
        textAlign: 'start',
    }),
    labelSmall: style({
        fontSize: vars.fontSize[12],
    }),
    description: style({
        color: vars.color.text.secondary,
        textAlign: 'start',
    }),
    descriptionSmall: style({
        fontSize: vars.fontSize[10],
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
        marginTop: vars.space[12],
        alignItems: 'flex-start',
    }),
    connectorItemVertical: style({
        flex: 'none',
        width: '100%',
        height: vars.space[20],
        marginLeft: 0,
        marginTop: vars.space[8],
        marginBottom: vars.space[12],
        paddingLeft: vars.space[14],
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
