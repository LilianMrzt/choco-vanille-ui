import InternalTextSizeMenu from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextSizeMenu.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const TextSizeMenu = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <InternalTextSizeMenu
            editor={editor}
            disabled={disabled}
        />
    )
}

TextSizeMenu.displayName = 'RichTextEditor.TextAppearanceGroup.TextSizeMenu'

export default TextSizeMenu
