import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

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
        border: `1px solid ${vars.color.border}`,
        borderBottomLeftRadius: vars.radius.xs,
        borderBottomRightRadius: vars.radius.xs,
        backgroundColor: vars.color.card,
        color: vars.editorColors.neutral.dark,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.md,
        lineHeight: vars.lineHeight.relaxed,
        selectors: {
            '&:has(.ProseMirror:focus-visible):not(:has(.ProseMirror[data-mouse-focus]))': {
                borderColor: vars.color.primary,
                boxShadow: 'none',
            },
            '&[data-invalid="true"]': {
                borderColor: vars.color.destructive,
            },
            '&[data-invalid="true"]:has(.ProseMirror:focus-visible):not(:has(.ProseMirror[data-mouse-focus]))': {
                boxShadow: 'none',
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

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror img`, {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror > p:first-child:last-child:has(br)::before`, {
    content: 'attr(data-placeholder)',
    position: 'absolute',
    color: vars.color.mutedForeground,
    pointerEvents: 'none',
})
