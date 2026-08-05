import type * as React from 'react'

import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'

type RichTextEditorBaseProps = {
    /** Controlled, versioned document value. */
    value?: RichTextValue
    /** Initial document value when the editor is uncontrolled. */
    defaultValue?: RichTextValue
    /** Called whenever the document changes in either controlled mode. */
    onValueChange?: (value: RichTextValue) => void
    /** Visible field label. Required unless an accessible ARIA name is supplied. */
    label?: string
    /** Help text rendered below the editor. Hidden when error is provided. */
    helperText?: string
    /** Error message rendered below the editor. */
    error?: string
    /** Placeholder shown when the document is empty. */
    placeholder?: string
    /** Prevents editing and toolbar interaction. */
    disabled?: boolean
    /** Makes the document non-editable while preserving its visual appearance. */
    readOnly?: boolean
    /** Marks the editable document as required for form semantics. */
    required?: boolean
    /** CSS width of the outer wrapper. Defaults to 100%. */
    width?: React.CSSProperties['width']
    className?: string
}

export type RichTextEditorProps = RichTextEditorBaseProps &
    (
        | {
              label: string
              'aria-label'?: string
              'aria-labelledby'?: string
          }
        | {
              label?: never
              'aria-label': string
              'aria-labelledby'?: string
          }
        | {
              label?: never
              'aria-label'?: string
              'aria-labelledby': string
          }
    )
