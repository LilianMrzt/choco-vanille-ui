import InternalTextColorPopover from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextColorPopover.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const TextColorMenu = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <InternalTextColorPopover
            editor={editor}
            disabled={disabled}
        />
    )
}

TextColorMenu.displayName = 'RichTextEditor.TextAppearanceGroup.TextColorMenu'

export default TextColorMenu
