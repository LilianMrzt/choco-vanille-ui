import { IconButton } from '@components/actions/icon-button'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

const SetLink = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <IconButton
            type={'button'}
            icon={'lucide:link'}
            aria-label={'Add or edit link'}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
                const currentHref = editor.getAttributes('link').href as string | undefined
                const nextHref = window.prompt('Link URL', currentHref ?? 'https://')
                const href = nextHref ? normalizeRichTextUrl(nextHref) : undefined

                if (href) {
                    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
                }
            }}
        />
    )
}

SetLink.displayName = 'RichTextEditor.SetLink'

export default SetLink
