import { UNDO_ICON as UndoIcon } from '@constants/icon-registry'
import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const Undo = () => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <Tooltip
            content={labels.undo}
            delayDuration={700}
            openOnFocus={false}
            position={'top'}
        >
            <IconButton
                type={'button'}
                icon={UndoIcon}
                aria-label={labels.undo}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled || !editor.can().undo()}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().undo().run()}
            />
        </Tooltip>
    )
}

Undo.displayName = 'RichTextEditor.Undo'

export default Undo
