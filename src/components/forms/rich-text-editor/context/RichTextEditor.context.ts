import { createContext, useContext } from 'react'
import type { Editor } from '@tiptap/react'
import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import type { RichTextEditorLabels } from '@components/forms/rich-text-editor/types/RichTextEditorLabels.types.ts'

export type RichTextEditorContextValue = {
    editor: Editor | null
    disabled: boolean
    readOnly: boolean
    onImageUpload?: (file: File) => Promise<string>
    label?: string
    helperText?: string
    error?: string
    ariaLabel?: string
    ariaLabelledBy?: string
    labelId: string
    helperId: string
    name?: string
    required: boolean
    renderedValue: RichTextValue
    labels: RichTextEditorLabels
}

export const RichTextEditorContext = createContext<RichTextEditorContextValue | undefined>(undefined)

export const useRichTextEditorContext = (): RichTextEditorContextValue => {
    const context = useContext(RichTextEditorContext)

    if (!context) {
        throw new Error('This component must be used inside a RichTextEditor.')
    }

    return context
}
