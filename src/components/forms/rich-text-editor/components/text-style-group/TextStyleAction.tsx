import { Toggle } from '@components/actions/toggle'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

type TextStyleActionProps = {
  mark: 'bold' | 'italic' | 'underline' | 'strike';
  icon: string;
  label: string;
  onToggle: () => void;
};

const TextStyleAction = ({
    mark,
    icon,
    label,
    onToggle,
}: TextStyleActionProps) => {
    const { editor, disabled } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <Toggle
            icon={icon}
            aria-label={label}
            pressed={editor.isActive(mark)}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onPressedChange={onToggle}
        />
    )
}

export const Bold = () => {
    const { editor, labels } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'bold'}
            icon={'lucide:bold'}
            label={labels.bold}
            onToggle={() => editor?.chain().focus().toggleBold().run()}
        />
    )
}
export const Italic = () => {
    const { editor, labels } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'italic'}
            icon={'lucide:italic'}
            label={labels.italic}
            onToggle={() => editor?.chain().focus().toggleItalic().run()}
        />
    )
}
export const Underline = () => {
    const { editor, labels } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'underline'}
            icon={'lucide:underline'}
            label={labels.underline}
            onToggle={() => editor?.chain().focus().toggleUnderline().run()}
        />
    )
}
export const Strike = () => {
    const { editor, labels } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'strike'}
            icon={'lucide:strikethrough'}
            label={labels.strikethrough}
            onToggle={() => editor?.chain().focus().toggleStrike().run()}
        />
    )
}

Bold.displayName = 'RichTextEditor.Bold'
Italic.displayName = 'RichTextEditor.Italic'
Underline.displayName = 'RichTextEditor.Underline'
Strike.displayName = 'RichTextEditor.Strike'
