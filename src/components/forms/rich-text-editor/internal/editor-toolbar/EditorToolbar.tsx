import ToolbarButton from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/ToolbarButton.tsx'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { IconButton } from '@components/actions/icon-button'

const EditorToolbar = ({ editor, disabled }: EditorToolbarProps) => {
    const toggleCurrentHeading = (level: 1 | 2) => {
        const { from } = editor.state.selection

        editor.chain().focus().setTextSelection(from).toggleHeading({ level }).run()
    }

    const isHeading = (level: 1 | 2) => editor.isActive('heading', { level })

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.root}
            role={'toolbar'}
            aria-label={'Text formatting'}
        >
            <ToolbarButton
                icon={'lucide:bold'}
                label={'Bold'}
                pressed={editor.isActive('bold')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
                icon={'lucide:italic'}
                label={'Italic'}
                pressed={editor.isActive('italic')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
                icon={'lucide:underline'}
                label={'Underline'}
                pressed={editor.isActive('underline')}
                disabled={disabled}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
            />
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
                pressed={isHeading(1)}
                disabled={disabled}
                onPressedChange={() => toggleCurrentHeading(1)}
            />
            <ToolbarButton
                icon={'lucide:heading-2'}
                label={'Heading 2'}
                pressed={isHeading(2)}
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

export default EditorToolbar
