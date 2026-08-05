import type { NamedExoticComponent } from 'react'

import type RichTextEditorLabel from '@components/forms/rich-text-editor/components/rich-text-editor-label/RichTextEditorLabel.tsx'

import type { RichTextEditorProps } from '@components/forms/rich-text-editor/types/RichTextEditor.props.ts'

export type RichTextEditorCompound = NamedExoticComponent<RichTextEditorProps> & {
    Label: typeof RichTextEditorLabel
}
