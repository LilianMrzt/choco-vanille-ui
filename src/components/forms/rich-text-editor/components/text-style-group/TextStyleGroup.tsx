import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import { Bold, Italic, Strike, Underline } from '@components/forms/rich-text-editor/components/text-style-group/TextStyleAction.tsx'

const TextStyleGroup = () => {
    const { editor } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Text style'}
        >
            <Bold />
            <Italic />
            <Underline />
            <Strike />
        </div>
    )
}

TextStyleGroup.displayName = 'RichTextEditor.TextStyleGroup'

export default TextStyleGroup
