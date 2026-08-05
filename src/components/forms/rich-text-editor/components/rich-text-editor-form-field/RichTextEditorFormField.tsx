import { memo, type FC } from 'react'

import { RICH_TEXT_EDITOR_FORM_FIELD_STYLES } from '@components/forms/rich-text-editor/components/rich-text-editor-form-field/styles/RichTextEditorFormField.css.ts'
import type { RichTextEditorFormFieldProps } from '@components/forms/rich-text-editor/components/rich-text-editor-form-field/types/RichTextEditorFormField.props.ts'

const RichTextEditorFormField: FC<RichTextEditorFormFieldProps> = memo(({
    name,
    value,
    disabled,
    required,
}) => (
    <textarea
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(event) => event.preventDefault()}
        tabIndex={-1}
        aria-hidden={'true'}
        className={RICH_TEXT_EDITOR_FORM_FIELD_STYLES.root}
    />
))

RichTextEditorFormField.displayName = 'RichTextEditor.FormField'

export default RichTextEditorFormField
