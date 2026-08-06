import { TOOLBAR_SEPARATOR_STYLES } from '@components/forms/rich-text-editor/components/toolbar-separator/styles/ToolbarSeparator.css.ts'

const ToolbarSeparator = () => (
    <div
        className={TOOLBAR_SEPARATOR_STYLES.root}
        role={'separator'}
        aria-orientation={'vertical'}
    />
)

ToolbarSeparator.displayName = 'RichTextEditor.ToolbarSeparator'

export default ToolbarSeparator
