import { IconButton } from '@components/actions/icon-button'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const Redo = () => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <IconButton
            type={'button'}
            icon={'lucide:redo-2'}
            aria-label={labels.redo}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled || !editor.can().redo()}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().redo().run()}
        />
    )
}

Redo.displayName = 'RichTextEditor.Redo'

export default Redo
