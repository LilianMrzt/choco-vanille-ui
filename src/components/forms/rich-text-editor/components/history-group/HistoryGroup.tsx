import { IconButton } from '@components/actions/icon-button'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const HistoryGroup = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'History'}
        >
            <IconButton
                type={'button'}
                icon={'lucide:undo-2'}
                aria-label={'Undo'}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled || !editor.can().undo()}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().undo().run()}
            />
            <IconButton
                type={'button'}
                icon={'lucide:redo-2'}
                aria-label={'Redo'}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled || !editor.can().redo()}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().redo().run()}
            />
        </div>
    )
}

HistoryGroup.displayName = 'RichTextEditor.HistoryGroup'

export default HistoryGroup
