import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { TEXT_STYLE_GROUP_STYLES } from '@components/forms/rich-text-editor/components/text-style-group/styles/TextStyleGroup.css.ts'
import { Bold, Italic, Strike, Underline } from '@components/forms/rich-text-editor/components/text-style-group/TextStyleAction.tsx'

const TextStyleGroup = () => {
    const { editor, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <div
            className={TEXT_STYLE_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.textStyleGroup}
        >
            <Bold />
            <Italic />
            <Underline />
            <Strike />
        </div>
    )
}

TextStyleGroup.displayName = 'RichTextEditor.TextStyleGroup'

export default TextStyleGroup
