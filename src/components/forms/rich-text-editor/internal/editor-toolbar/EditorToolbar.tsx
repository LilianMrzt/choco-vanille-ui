import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import AlignmentToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/alignment-toolbar-group/AlignmentToolbarGroup.tsx'
import BlockStyleToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/block-style-toolbar-group/BlockStyleToolbarGroup.tsx'
import HistoryToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/history-toolbar-group/HistoryToolbarGroup.tsx'
import ImageToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/image-toolbar-group/ImageToolbarGroup.tsx'
import LinkToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/link-toolbar-group/LinkToolbarGroup.tsx'
import TextAppearanceToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-appearance-toolbar-group/TextAppearanceToolbarGroup.tsx'
import TextStyleToolbarGroup from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/TextStyleToolbarGroup.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-separator/ToolbarSeparator.tsx'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const EditorToolbar = ({ editor, disabled, onImageUpload }: EditorToolbarProps) => (
    <div
        className={EDITOR_TOOLBAR_STYLES.root}
        role={'toolbar'}
        aria-label={'Text formatting'}
        onKeyDown={(event) => {
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
            const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)

            if (currentIndex === -1) {
                return
            }

            const nextIndex = event.key === 'ArrowRight'
                ? (currentIndex + 1) % buttons.length
                : event.key === 'ArrowLeft'
                    ? (currentIndex - 1 + buttons.length) % buttons.length
                    : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                            ? buttons.length - 1
                            : undefined

            if (nextIndex !== undefined) {
                event.preventDefault()
                buttons[nextIndex].focus()
            }
        }}
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
        <TextAppearanceToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <LinkToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <BlockStyleToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <AlignmentToolbarGroup
            editor={editor}
            disabled={disabled}
        />
        <ToolbarSeparator />
        <ImageToolbarGroup
            editor={editor}
            disabled={disabled}
            onImageUpload={onImageUpload}
        />
    </div>
)

export default EditorToolbar
