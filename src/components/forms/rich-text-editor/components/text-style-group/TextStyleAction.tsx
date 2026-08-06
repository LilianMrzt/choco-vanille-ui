import ToolbarButton from '@components/forms/rich-text-editor/internal/editor-toolbar/components/toolbar-button/ToolbarButton.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

type TextStyleActionProps = {
    mark: 'bold' | 'italic' | 'underline' | 'strike'
    icon: string
    label: string
    onToggle: () => void
}

const TextStyleAction = ({ mark, icon, label, onToggle }: TextStyleActionProps) => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <ToolbarButton
            icon={icon}
            label={label}
            pressed={editor.isActive(mark)}
            disabled={disabled}
            onPressedChange={onToggle}
        />
    )
}

export const Bold = () => {
    const { editor } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'bold'}
            icon={'lucide:bold'}
            label={'Bold'}
            onToggle={() => editor?.chain().focus().toggleBold().run()}
        />
    )
}
export const Italic = () => {
    const { editor } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'italic'}
            icon={'lucide:italic'}
            label={'Italic'}
            onToggle={() => editor?.chain().focus().toggleItalic().run()}
        />
    )
}
export const Underline = () => {
    const { editor } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'underline'}
            icon={'lucide:underline'}
            label={'Underline'}
            onToggle={() => editor?.chain().focus().toggleUnderline().run()}
        />
    )
}
export const Strike = () => {
    const { editor } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'strike'}
            icon={'lucide:strikethrough'}
            label={'Strikethrough'}
            onToggle={() => editor?.chain().focus().toggleStrike().run()}
        />
    )
}

Bold.displayName = 'RichTextEditor.Bold'
Italic.displayName = 'RichTextEditor.Italic'
Underline.displayName = 'RichTextEditor.Underline'
Strike.displayName = 'RichTextEditor.Strike'
