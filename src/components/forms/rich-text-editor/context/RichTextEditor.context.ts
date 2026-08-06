import { createContext, useContext } from 'react'
import type { Editor } from '@tiptap/react'
import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'

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
}

export const RichTextEditorContext = createContext<RichTextEditorContextValue | undefined>(undefined)

export const useRichTextEditorContext = (): RichTextEditorContextValue => {
    const context = useContext(RichTextEditorContext)

    if (!context) {
        throw new Error('This component must be used inside a RichTextEditor.')
    }

    return context
}
