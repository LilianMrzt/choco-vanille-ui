import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import BlockStyleToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/block-style-toolbar-group/BlockStyleToolbarGroup.tsx'
import HistoryToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/history-toolbar-group/HistoryToolbarGroup.tsx'
import TextStyleToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextStyleToolbarGroup.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-separator/ToolbarSeparator.tsx'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const EditorToolbar = ({ editor, disabled }: EditorToolbarProps) => (
    <div
        className={EDITOR_TOOLBAR_STYLES.root}
        role={'toolbar'}
        aria-label={'Text formatting'}
    >
        <HistoryToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <TextStyleToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <BlockStyleToolbarGroup
            editor={editor}
            disabled={disabled}
        />
    </div>
)

export default EditorToolbar
