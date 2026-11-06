import { globalStyle, style } from '@vanilla-extract/css'

export const CONTEXT_MENU_CONTENT_STYLES = {
    root: style({}),
}

globalStyle(
    `${CONTEXT_MENU_CONTENT_STYLES.root}[data-input-modality="pointer"] [role^="menuitem"]:focus-visible`,
    {
        outline: 'none',
        boxShadow: 'none',
    },
)
