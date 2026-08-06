import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { HISTORY_GROUP_STYLES } from '@components/forms/rich-text-editor/components/history-group/styles/HistoryGroup.css.ts'
import Redo from '@components/forms/rich-text-editor/components/history-group/Redo.tsx'
import Undo from '@components/forms/rich-text-editor/components/history-group/Undo.tsx'

const HistoryGroup = () => {
    const { editor, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={HISTORY_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.historyGroup}
        >
            <Undo />
            <Redo />
        </div>
    )
}

HistoryGroup.displayName = 'RichTextEditor.HistoryGroup'

export default HistoryGroup
