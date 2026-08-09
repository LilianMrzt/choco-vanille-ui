import { Toggle } from '@components/actions/toggle'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import type { TextStyleActionProps } from '@components/forms/rich-text-editor/components/text-style-group/types/TextStyleAction.props.ts'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ItalicIcon from '@resources/asset/ItalicIcon.svg?react'
import StrikethroughIcon from '@resources/asset/StrikethroughIcon.svg?react'
import UnderlineIcon from '@resources/asset/UnderlineIcon.svg?react'

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
                variant={'ghost'}
                subtle
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
