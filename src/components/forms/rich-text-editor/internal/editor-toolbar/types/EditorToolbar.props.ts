import type { Editor } from '@tiptap/react'

export type EditorToolbarProps = {
    editor: Editor
    disabled: boolean
    onImageUpload?: (file: File) => Promise<string>
}
