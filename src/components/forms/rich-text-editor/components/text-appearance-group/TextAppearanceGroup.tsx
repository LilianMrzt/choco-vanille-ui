import type { FC } from 'react'

import TextColorMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextColorMenu.tsx'
import TextSizeMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextSizeMenu.tsx'
import { TEXT_APPEARANCE_GROUP_STYLES } from '@components/forms/rich-text-editor/components/text-appearance-group/styles/TextAppearanceGroup.css.ts'

type TextAppearanceGroupCompound = FC & {
    TextColorMenu: typeof TextColorMenu
    TextSizeMenu: typeof TextSizeMenu
}

const TextAppearanceGroup = (() => (
    <div
        className={TEXT_APPEARANCE_GROUP_STYLES.root}
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
