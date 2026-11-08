import { BOLD_ICON as BoldIcon, ITALIC_ICON as ItalicIcon, STRIKETHROUGH_ICON as StrikethroughIcon, UNDERLINE_ICON as UnderlineIcon } from '@constants/icon-registry'
import { Toggle } from '@components/actions/toggle'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import type { TextStyleActionProps } from '@components/forms/rich-text-editor/components/text-style-group/types/TextStyleAction.props.ts'

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
        <Tooltip
            content={label}
            delayDuration={700}
            openOnFocus={false}
            position={'top'}
        >
            <Toggle
                icon={icon}
                aria-label={label}
                pressed={editor.isActive(mark)}
                variant={'ghostSubtle'}
                color={'primary'}
                size={'sm'}
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
                onPressedChange={onToggle}
            />
        </Tooltip>
    )
}

export const Bold = () => {
    const { editor, labels } = useRichTextEditorContext()
    return (
        <TextStyleAction
            mark={'bold'}
            icon={BoldIcon}
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
            icon={ItalicIcon}
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
            icon={UnderlineIcon}
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
            icon={StrikethroughIcon}
            label={labels.strikethrough}
            onToggle={() => editor?.chain().focus().toggleStrike().run()}
        />
    )
}

Bold.displayName = 'RichTextEditor.Bold'
Italic.displayName = 'RichTextEditor.Italic'
Underline.displayName = 'RichTextEditor.Underline'
Strike.displayName = 'RichTextEditor.Strike'
