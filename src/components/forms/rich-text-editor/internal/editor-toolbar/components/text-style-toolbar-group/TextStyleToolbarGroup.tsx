import ToolbarButton from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/ToolbarButton.tsx'
import TextColorPopover from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextColorPopover.tsx'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const TextStyleToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => (
    <div
        className={EDITOR_TOOLBAR_STYLES.group}
        role={'group'}
        aria-label={'Text style'}
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
        <TextColorPopover
            editor={editor}
            disabled={disabled}
        />
    </div>
)

export default TextStyleToolbarGroup
