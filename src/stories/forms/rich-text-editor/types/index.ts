import type { RichTextEditorFieldProps } from '@components/forms/rich-text-editor'

export type RichTextEditorPlaygroundArgs = RichTextEditorFieldProps & {    showToolbarGroups?: boolean
    showTextStyleGroup?: boolean
    showTextAppearanceGroup?: boolean
    showTextColorMenu?: boolean
    showTextSizeMenu?: boolean
    textSizePresentation?: 'icon' | 'select'
    showLinkGroup?: boolean
    showSetLink?: boolean
    showUnsetLink?: boolean
    showListsGroup?: boolean
    showAlignmentGroup?: boolean
    showImageGroup?: boolean
    showToolbarSeparator?: boolean
}
