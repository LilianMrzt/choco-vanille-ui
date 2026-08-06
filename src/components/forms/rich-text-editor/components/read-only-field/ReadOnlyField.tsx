import { memo, type FC } from 'react'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import { RichTextEditorFormField } from '@components/forms/rich-text-editor/components/rich-text-editor-form-field'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import type { ReadOnlyFieldProps } from '@components/forms/rich-text-editor/components/read-only-field/types/ReadOnlyField.props.ts'

const ReadOnlyField: FC<ReadOnlyFieldProps> = memo(({ className }) => {
    const {
        ariaLabel,
        ariaLabelledBy,
        error,
        helperText,
        label,
        labelId,
        helperId,
        name,
        disabled,
        renderedValue,
        editor,
    } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    return (
        <>
            <RichTextRenderer
                value={renderedValue}
                className={className}
                aria-describedby={error || helperText ? helperId : undefined}
                aria-invalid={error ? 'true' : undefined}
                aria-label={ariaLabel ?? label}
                aria-labelledby={ariaLabelledBy ?? (label ? labelId : undefined)}
            />
            {name && (
                <RichTextEditorFormField
                    name={name}
                    value={editor.isEmpty ? '' : JSON.stringify(editor.getJSON())}
                    disabled={disabled}
                    required={false}
                />
            )}
        </>
    )
})

ReadOnlyField.displayName = 'RichTextEditor.ReadOnlyField'

export default ReadOnlyField
