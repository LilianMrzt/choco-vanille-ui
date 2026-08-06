import type { RichTextEditorToolbarPresentation } from '@components/forms/rich-text-editor/types/RichTextEditorToolbarPresentation.types.ts'

export type BlockFormatGroupProps = {
    /** Renders a single menu trigger or the block actions directly in the toolbar. Defaults to `menu`. */
    presentation?: RichTextEditorToolbarPresentation
}
