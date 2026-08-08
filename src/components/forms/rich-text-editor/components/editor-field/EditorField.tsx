import { EditorContent } from '@tiptap/react'
import { memo, type FC } from 'react'

import { RichTextEditorFormField } from '@components/forms/rich-text-editor/components/rich-text-editor-form-field'
import type { EditorFieldProps } from '@components/forms/rich-text-editor/components/editor-field/types/EditorField.props.ts'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { RICH_TEXT_EDITOR_STYLES } from '@components/forms/rich-text-editor/styles/RichTextEditor.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Editable TipTap content area slot for use inside `RichTextEditor`.
 * Renders the `EditorContent` and, when `name` is set in context,
 * an invisible form field for native form submission.
 */
const EditorField: FC<EditorFieldProps> = memo(({ className }) => {
    const { editor, disabled, error, name, required } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <>
            <div
                className={cn(RICH_TEXT_EDITOR_STYLES.editor, className)}
                data-disabled={disabled || undefined}
                data-invalid={Boolean(error) || undefined}
            >
                <EditorContent editor={editor} />
            </div>
            {name && (
                <RichTextEditorFormField
                    name={name}
                    value={editor.isEmpty ? '' : JSON.stringify(editor.getJSON())}
                    disabled={disabled}
                    required={required}
                />
            )}
        </>
    )
})

EditorField.displayName = 'RichTextEditor.EditorField'

export default EditorField
