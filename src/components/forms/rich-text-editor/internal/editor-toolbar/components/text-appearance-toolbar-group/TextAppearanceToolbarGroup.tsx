import TextColorPopover from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextColorPopover.tsx'
import TextSizeMenu from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextSizeMenu.tsx'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const TextAppearanceToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => (
    <div
        className={EDITOR_TOOLBAR_STYLES.group}
        role={'group'}
        aria-label={'Text appearance'}
    >
        <TextColorPopover
            editor={editor}
            disabled={disabled}
        />
        <TextSizeMenu
            editor={editor}
            disabled={disabled}
        />
    </div>
)

export default TextAppearanceToolbarGroup
