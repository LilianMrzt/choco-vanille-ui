import { IconButton } from '@components/actions/icon-button'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

const LinkToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => (
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

export default LinkToolbarGroup
