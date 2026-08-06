import { IconButton } from '@components/actions/icon-button'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const Undo = () => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <IconButton
            type={'button'}
            icon={'lucide:undo-2'}
            aria-label={labels.undo}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled || !editor.can().undo()}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().undo().run()}
        />
    )
}

Undo.displayName = 'RichTextEditor.Undo'

export default Undo
