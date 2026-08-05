import { IconButton } from '@components/actions/icon-button'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const LinkGroup = () => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Links'}
        >
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
        </div>
    )
}

LinkGroup.displayName = 'RichTextEditor.LinkGroup'

export default LinkGroup
