import { memo, type FC } from 'react'

import RichTextEditor from '@components/forms/rich-text-editor/RichTextEditor.tsx'
import type { RichTextEditorFieldProps } from '@components/forms/rich-text-editor/types/RichTextEditorField.props.ts'

/**
 * Convenience wrapper around `RichTextEditor` that renders its default,
 * non-compound layout (label, toolbar, editable document, helper text).
 * Use `RichTextEditor` with compound slots for a fully custom layout.
 */
const RichTextEditorField: FC<RichTextEditorFieldProps> = memo((props) => (
    <RichTextEditor {...props} />
))

RichTextEditorField.displayName = 'RichTextEditorField'

export default RichTextEditorField
