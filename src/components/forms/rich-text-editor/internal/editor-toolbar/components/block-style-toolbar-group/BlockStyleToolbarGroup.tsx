import { IconButton } from '@components/actions/icon-button'
import ToolbarButton from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/ToolbarButton.tsx'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const BlockStyleToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => {
    const toggleCurrentHeading = (level: 1 | 2) => {
        const { from } = editor.state.selection

        editor.chain().focus().setTextSelection(from).toggleHeading({ level }).run()
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Block style'}
        >
            <IconButton
                type={'button'}
                icon={'lucide:pilcrow'}
                aria-label={'Paragraph'}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().setParagraph().run()}
            />
            <ToolbarButton
                icon={'lucide:heading-1'}
                label={'Heading 1'}
                pressed={editor.isActive('heading', { level: 1 })}
                disabled={disabled}
                onPressedChange={() => toggleCurrentHeading(1)}
            />
            <ToolbarButton
                icon={'lucide:heading-2'}
                label={'Heading 2'}
                pressed={editor.isActive('heading', { level: 2 })}
                disabled={disabled}
                onPressedChange={() => toggleCurrentHeading(2)}
            />
            <ToolbarButton
                icon={'lucide:list'}
                label={'Bulleted list'}
                pressed={editor.isActive('bulletList')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
                icon={'lucide:list-ordered'}
                label={'Numbered list'}
                pressed={editor.isActive('orderedList')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            />
        </div>
    )
}

export default BlockStyleToolbarGroup
