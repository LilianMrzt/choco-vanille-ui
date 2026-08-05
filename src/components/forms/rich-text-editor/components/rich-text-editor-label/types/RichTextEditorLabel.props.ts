import type { ReactNode } from 'react'

export type RichTextEditorLabelProps = {
    /** Defaults to the label id shared through RichTextEditor's context. */
    id?: string
    disabled?: boolean
    children: ReactNode
}
