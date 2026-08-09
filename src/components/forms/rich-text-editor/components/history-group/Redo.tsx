import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import RedoIcon from '@resources/asset/RedoIcon.svg?react'

const Redo = () => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <Tooltip
            content={labels.redo}
            delayDuration={700}
            openOnFocus={false}
            position={'top'}
        >
            <IconButton
                type={'button'}
                icon={RedoIcon}
                aria-label={labels.redo}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled || !editor.can().redo()}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().redo().run()}
            />
        </Tooltip>
    )
}

Redo.displayName = 'RichTextEditor.Redo'

export default Redo
