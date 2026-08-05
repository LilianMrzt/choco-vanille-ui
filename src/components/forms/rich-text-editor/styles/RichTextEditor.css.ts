import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const RICH_TEXT_EDITOR_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: vars.space.xs,
        width: '100%',
    }),
    editor: style({
        minHeight: '10rem',
        padding: vars.space.md,
        border: `1px solid ${vars.color.input}`,
        borderBottomLeftRadius: vars.radius.sm,
        borderBottomRightRadius: vars.radius.sm,
        backgroundColor: vars.color.card,
        color: vars.editorColors.neutral.dark,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.md,
        lineHeight: vars.lineHeight.relaxed,
        selectors: {
            '&:focus-within': {
                borderColor: vars.color.primary,
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-invalid="true"]': {
                borderColor: vars.color.destructive,
            },
            '&[data-invalid="true"]:focus-within': {
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.destructive}`,
            },
            '&[data-disabled="true"]': {
                cursor: 'not-allowed',
                opacity: 0.45,
                backgroundColor: vars.color.muted,
            },
        },
    }),
}

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror`, {
    minHeight: '8rem',
    outline: 'none',
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror > *:first-child`, {
    marginTop: 0,
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror > *:last-child`, {
    marginBottom: 0,
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror ul, ${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror ol`, {
    paddingLeft: vars.space['2xl'],
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror > p:first-child:last-child:has(br)::before`, {
    content: 'attr(data-placeholder)',
    position: 'absolute',
    color: vars.color.mutedForeground,
    pointerEvents: 'none',
})
