import { IconButton } from '@components/actions/icon-button'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const HistoryToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => (
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

export default HistoryToolbarGroup
