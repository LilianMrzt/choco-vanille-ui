import type * as React from 'react'
import type { ReactNode } from 'react'

import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import type { RichTextEditorLabels } from '@components/forms/rich-text-editor/types/RichTextEditorLabels.types.ts'

type RichTextEditorBaseProps = {
    /** Controlled, versioned document value. */
    value?: RichTextValue
    /** Initial document value when the editor is uncontrolled. */
    defaultValue?: RichTextValue
    /** Called whenever the document changes in either controlled mode. */
    onValueChange?: (value: RichTextValue) => void
    /** Uploads an image selected from the toolbar and resolves to its public URL. */
    onImageUpload?: (file: File) => Promise<string>
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
    /** Form field name used to submit the JSON document value. */
    name?: string
    /** CSS width of the outer wrapper. Defaults to 100%. */
    width?: React.CSSProperties['width']
    className?: string
    /**
     * Localizable accessible labels for every toolbar control and user-facing
     * prompt string. Provide only the keys you want to override; English
     * defaults are used for every omitted key.
     */
    labels?: Partial<RichTextEditorLabels>
    /**
     * Compound slots (`RichTextEditor.Label`, `RichTextEditor.Toolbar`, `RichTextEditor.EditorField`, ...).
     */
    children: ReactNode
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
