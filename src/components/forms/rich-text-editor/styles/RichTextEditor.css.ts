import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const RICH_TEXT_EDITOR_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: vars.space[4],
        width: '100%',
    }),
    editor: style({
        minHeight: '10rem',
        padding: vars.space[12],
        border: `1px solid ${vars.color.border.main}`,
        borderBottomLeftRadius: vars.radius[4],
        borderBottomRightRadius: vars.radius[4],
        backgroundColor: vars.color.surface.main,
        color: vars.editorColors.neutral.dark,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize[16],
        lineHeight: '1.625',
        selectors: {
            '&:has(.ProseMirror:focus-visible):not(:has(.ProseMirror[data-mouse-focus]))': {
                borderColor: vars.color.primary.main,
                boxShadow: 'none',
            },
            '&[data-invalid="true"]': {
                borderColor: vars.color.danger.main,
            },
            '&[data-invalid="true"]:has(.ProseMirror:focus-visible):not(:has(.ProseMirror[data-mouse-focus]))': {
                boxShadow: 'none',
            },
            '&[data-disabled="true"]': {
                cursor: 'not-allowed',
                opacity: 0.45,
                backgroundColor: vars.color.surface.muted,
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
    paddingLeft: vars.space[32],
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror img`, {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
})

globalStyle(`${RICH_TEXT_EDITOR_STYLES.editor} .ProseMirror > p:first-child:last-child:has(br)::before`, {
    content: 'attr(data-placeholder)',
    position: 'absolute',
    color: vars.color.surface.mutedForeground,
    pointerEvents: 'none',
})
