import ToolbarButton from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/ToolbarButton.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const TextStyleGroup = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Text style'}
        >
            <ToolbarButton
                icon={'lucide:bold'}
                label={'Bold'}
                pressed={editor.isActive('bold')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
                icon={'lucide:italic'}
                label={'Italic'}
                pressed={editor.isActive('italic')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
                icon={'lucide:underline'}
                label={'Underline'}
                pressed={editor.isActive('underline')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            />
            <ToolbarButton
                icon={'lucide:strikethrough'}
                label={'Strikethrough'}
                pressed={editor.isActive('strike')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            />
        </div>
    )
}

TextStyleGroup.displayName = 'RichTextEditor.TextStyleGroup'

export default TextStyleGroup
