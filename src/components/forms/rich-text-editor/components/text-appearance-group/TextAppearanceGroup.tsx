import type { FC } from 'react'

import TextColorMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextColorMenu.tsx'
import TextSizeMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextSizeMenu.tsx'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

type TextAppearanceGroupCompound = FC & {
    TextColorMenu: typeof TextColorMenu
    TextSizeMenu: typeof TextSizeMenu
}

const TextAppearanceGroup = (() => (
    <div
        className={EDITOR_TOOLBAR_STYLES.group}
        role={'group'}
        aria-label={'Text appearance'}
    >
        <TextColorMenu />
        <TextSizeMenu />
    </div>
)) as unknown as TextAppearanceGroupCompound

TextAppearanceGroup.displayName = 'RichTextEditor.TextAppearanceGroup'
TextAppearanceGroup.TextColorMenu = TextColorMenu
TextAppearanceGroup.TextSizeMenu = TextSizeMenu

export default TextAppearanceGroup
export type { TextAppearanceGroupCompound }
