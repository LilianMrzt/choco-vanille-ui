import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import Redo from '@components/forms/rich-text-editor/components/history-group/Redo.tsx'
import Undo from '@components/forms/rich-text-editor/components/history-group/Undo.tsx'

const HistoryGroup = () => {
    const { editor } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'History'}
        >
            <Undo />
            <Redo />
        </div>
    )
}

HistoryGroup.displayName = 'RichTextEditor.HistoryGroup'

export default HistoryGroup
