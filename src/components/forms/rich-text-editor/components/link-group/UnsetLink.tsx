import { IconButton } from '@components/actions/icon-button'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const UnsetLink = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <IconButton
            type={'button'}
            icon={'lucide:unlink'}
            aria-label={'Remove link'}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled || !editor.isActive('link')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().unsetLink().run()}
        />
    )
}

UnsetLink.displayName = 'RichTextEditor.UnsetLink'

export default UnsetLink
