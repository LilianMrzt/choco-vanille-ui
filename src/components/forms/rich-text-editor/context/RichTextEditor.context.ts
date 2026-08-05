import { createContext, useContext } from 'react'
import type { Editor } from '@tiptap/react'

export type RichTextEditorContextValue = {
    editor: Editor | null
    disabled: boolean
    readOnly: boolean
    onImageUpload?: (file: File) => Promise<string>
    error?: string
    labelId: string
    helperId: string
    name?: string
    required: boolean
}

export const RichTextEditorContext = createContext<RichTextEditorContextValue | undefined>(undefined)

export const useRichTextEditorContext = (): RichTextEditorContextValue => {
    const context = useContext(RichTextEditorContext)

    if (!context) {
        throw new Error('This component must be used inside a RichTextEditor.')
    }

    return context
}
