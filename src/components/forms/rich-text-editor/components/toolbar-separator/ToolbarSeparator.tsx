import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const ToolbarSeparator = () => (
    <div
        className={EDITOR_TOOLBAR_STYLES.separator}
        role={'separator'}
        aria-orientation={'vertical'}
    />
)

ToolbarSeparator.displayName = 'RichTextEditor.ToolbarSeparator'

export default ToolbarSeparator
